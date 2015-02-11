Ext.define('Reminder.view.SettingsPanel', {
	extend: 'Ext.form.Panel',
	xtype: 'settingspanel',

	requires: [
		'Ext.field.Toggle',
		'Ext.field.Slider',
		'Ext.Label'
	],

	config: {
		
	},

	initialize: function(){
		this.callParent(arguments);

        console.log('View - SettingsPanel - initialize');

		var me = this;
        var settingsStore = Ext.getStore('Settings');
        var geoPositionValue;
        var refreshIntervall;
        var geoRadius;

        if(settingsStore.getCount() == 0){

            console.log('View - SettingsPanel - New');

            geoPositionValue = 0;
            geoRadius = 50;
            refreshIntervall = 20;

            this.fireEvent('initSettingsStoreCommand', geoPositionValue, refreshIntervall);
        }else{

            console.log('View - SettingsPanel - Old');

            geoPositionValue = settingsStore.getAt(0).get('geoPosition');
            geoRadius = settingsStore.getAt(0).get('geoRadius');
            refreshIntervall = settingsStore.getAt(0).get('refresh');
        }

        Wifi.setCurrentRefreshRate(refreshIntervall*1000);
        Wifi.setCurrentGeoRadius(geoRadius);

        console.log('Pos: ' +  geoPositionValue + ' Inter: ' + refreshIntervall);

		var toggleGPS = {
            xtype: 'fieldset',
            hidden: true,
            items:{
                xtype: 'togglefield',
                name: 'GPSPosition',
                label: 'GPS Position',
                labelAlign: 'top',             
                listeners: {
                	change: function(object, newValue, oldValue, eOpts){
                		me.onChangeToggleGPS(newValue);
                	}
                }
            }
        };

        var sliderIntervall = {
            xtype: 'fieldset',
            items:{
                xtype: 'sliderfield',
                name: 'refresh',
                label: 'Check-Intervall: ' + refreshIntervall + ' s',
                labelAlign: 'top',
                flex: 17,
                minValue: 5,
                maxValue: 60,
                increment: 5,
                value: refreshIntervall,
                listeners: {
                    change: function(object, sl, thumb, newValue, oldValue, eOpts ){
                       me.onChangeSliderIntervall(this, newValue);
                    }
                }
            }            
        };

        var geoRadiusIntervall = {
            xtype: 'fieldset',
            items:{
                xtype: 'sliderfield',
                name: 'geoRadius',
                label: 'Geo-Radius: ' + geoRadius + ' m',
                labelAlign: 'top',
                flex: 17,
                minValue: 15,
                maxValue: 100,
                increment: 5,
                value: geoRadius,
                listeners: {
                    change: function(object, sl, thumb, newValue, oldValue, eOpts ){
                       me.onChangeGeoRadius(this, newValue);
                    }
                }
            }            
        };

        this.add([
        	toggleGPS,
        	sliderIntervall,
            geoRadiusIntervall
        ]);
	},

    onChangeSliderIntervall: function(self, newValue){
        console.log('View - Settings - SliderIntervall');
        this.fireEvent('changeSliderIntervallCommand', this, self, newValue);
    },

	onChangeToggleGPS: function(newValue){
		console.log('View - Settings - Toggle GPS');
		this.fireEvent('changeToggleGPSCommand', this, newValue);
	},

    onChangeGeoRadius: function(self, newValue) {
        console.log('View - Settings - GeoRadius');
        this.fireEvent('changeSliderGeoRadiusCommand', this, self, newValue);
    }
});