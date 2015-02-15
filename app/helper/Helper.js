
Ext.define('Reminder.helper.Helper', {
    singleton : true,
    alternateClassName : 'Helper',
    requires: [
        'Ext.util.DelayedTask',
        'Reminder.store.Reminds'
    ],

    config: {
    	wifiList: '',
        currentLatitude: 0,
        currentLongitude: 0,
        currentRefreshRate: 6000,
        currentGeoRadius: 50,
        currentMacList: null,
    },

    constructor: function(config) {
    	console.log('Helper - init');
    	this.initConfig(config);

    	return this;
    },

    isjQueryLoaded: function() {
    	if (typeof jQuery == 'undefined')
		    return false;
		else 
			return true;
		
    },

    getCurrentGeoLocation: function() {
    	console.log('Helper - getCurrentGeoLocation');

        var me = this;

    	var onSuccess = function(position) {
		    /*
                navigator.notification.alert('Latitude: '          + position.coords.latitude          + '\n' +
		          'Longitude: '         + position.coords.longitude         + '\n' +
		          'Altitude: '          + position.coords.altitude          + '\n' +
		          'Accuracy: '          + position.coords.accuracy          + '\n' +
		          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
		          'Heading: '           + position.coords.heading           + '\n' +
		          'Speed: '             + position.coords.speed             + '\n' +
		          'Timestamp: '         + position.timestamp                + '\n', 'Geo Info', 'OK');
            */

            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            me.setCurrentLatitude(position.coords.latitude);
            me.setCurrentLongitude(position.coords.longitude);
		};

		// onError Callback receives a PositionError object
		//
		function onError(error) {
		    navigator.notification.alert('code: '    + error.code    + '\n' +
		          'message: ' + error.message + '\n', 'Geo Error', 'OK');
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError);

    },

    startCheckRemindTask: function(){

        var me = this;

        /*window.plugin.notification.local.hasPermission(function (granted) {
            console.log('Permission has been granted: ' + granted);
        });*/

        var run = function () {
            Ext.create('Ext.util.DelayedTask', function () {

            var reminds = Ext.getStore('Reminds');
            
            $.each(reminds.load().data.all, function(key, val){ 
                
                switch(val.data.type) {
                    case 'Normal': 
                        me.checkStandardRemind(val);
                        break;
                    case 'Geo Remind':
                        me.checkGeoRemind(val);
                        break;
                    case 'Wifi Remind':
                        me.checkWifiRemind(val);
                        break;
                }

            }); 

            console.log(new Date());
            
            run(Helper.getCurrentRefreshRate());

            }).delay(Helper.getCurrentRefreshRate());
        };

        run();
    },

    test: function() {
        navigator.notification.alert('test','Info','OK');

    },

    checkStandardRemind: function( remind ) {
        console.log('checkReminds');
        console.log(remind);
        
        var remindTime = remind.data.remindDateTime.getTime();
        var currentTime = Date.now();

        if(remindTime < currentTime){
            this.checkNotificationSetting(remind);
            this.deleteActivatedRemind(remind);
        }
        console.log(remindTime);
        console.log(currentTime);
    },

    checkGeoRemind: function( remind ) {
        console.log('checkGeoReminds');
        //console.log(remind);

        var placeStore = Ext.getStore('Places');

        //console.log('Search index of: ' + remind.data.place);
        var index = placeStore.find('place', remind.data.place);

        var currentCoords = placeStore.getAt( index );

        var remindGeoCoordsLat = currentCoords.data.latitude;
        var remindGeoCoordsLng = currentCoords.data.longitude;

        console.log('Lat: ' + remindGeoCoordsLat);
        console.log('Lng: ' + remindGeoCoordsLng);

        Helper.getCurrentGeoLocation();

        var curLat = Helper.getCurrentLatitude();
        var curLng = Helper.getCurrentLongitude();

        console.log('Current: ' + curLat);
        console.log('Current: ' + curLng);


        distanceInMeters = this.getDistance(remindGeoCoordsLat, remindGeoCoordsLng, curLat, curLng);
        
        if( distanceInMeters <= Helper.getCurrentGeoRadius() ) {
            this.checkNotificationSetting(remind);
            this.deleteActivatedRemind(remind);
        }

        console.log(distanceInMeters + ' Meters');
    },

    checkWifiRemind: function( remind ) {
        console.log('checkWifiReminds');
        var wifiStore = Ext.getStore('Wifis');


        var index = wifiStore.find('ssid', remind.data.ssid_mac);

        var currentWifiData = wifiStore.getAt( index );

        // TODO momentan wird im remindStore nur die SSid gespeichert, diese ist nicht eindeutig
        var ssid = currentWifiData.data.ssid;
        var mac = currentWifiData.data.mac;

        var me = this;

        this.prepareWifiList(function() {
            var list = me.getWifiList();
            
            $.each(list.ssid, function(key, val){

                if( ssid == val.ssid ){
                    me.checkNotificationSetting(remind);
                    me.deleteActivatedRemind(remind);
                }
            });
        });
    },

    checkNotificationSetting: function(remind) {

        var settedNotification = remind.data.notification;

        switch( settedNotification ) {
            case 'Ringtone': 
                navigator.notification.beep(1);
                break;
            case 'Only vibrate':
                navigator.vibrate(1000);
                break;
            case 'Vibrate & Ringtone':
                navigator.vibrate(1000);
                navigator.notification.beep(1);
                break;
        }

        window.plugin.notification.local.add({ title: 'New Remind', message: remind.data.message, autoCancel: true });
    },

    deleteActivatedRemind: function(remind) {
        var remindStore = Ext.getStore('Reminds');
        remindStore.remove(remind);
        remindStore.sync();
    },

    /**
	 *	A function that returns an multidimensional array in form of following
	 *
	 *	array[
	 *		ssid[],
	 *		mac[]
	 *	] 
 	 *
	 *	when no wifi is activated then return false
	 *
     */
    prepareWifiList : function(callback){

    	var me = this;

        navigator.wifi.getWifiInfo(
        	
            function(data){

            	var networks = {
		        	'ssid': [],
		        	'mac': []
		        };
            		
            	for(var i= 0; i < data.networks.length; i++)
		        {	
		        	networks.ssid.push( {ssid: data.networks[i].SSID} );
		        	networks.mac.push( {mac: data.networks[i].BSSID} );
		        }
		        
		        me.setWifiList(networks);
                callback();
        	    
            }, 
            function(){
                navigator.notification.alert('error','Info','OK');
           	}, []
        );
    },

    /*
        http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
    */
    rad: function(x) {
        return x * Math.PI / 180;
    },

    getDistance: function(p1_lat, p1_lng, p2_lat, p2_lng) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = this.rad(p2_lat - p1_lat);
        var dLong = this.rad(p2_lng - p1_lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(p1_lat)) * Math.cos(this.rad(p2_lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        
        return d; // returns the distance in meter
    }
});