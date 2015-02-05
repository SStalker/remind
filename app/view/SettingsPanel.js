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
        var geoRefreshIntervall;

        if(settingsStore.getCount() == 0){

            console.log('View - SettingsPanel - New');

            geoPositionValue = 0;
            geoRefreshIntervall = 60;

            this.fireEvent('initSettingsStoreCommand', geoPositionValue, geoRefreshIntervall);
        }else{

            console.log('View - SettingsPanel - Old');

            geoPositionValue = settingsStore.getAt(0).get('geoPosition');
            geoRefreshIntervall = settingsStore.getAt(0).get('geoRefresh');
        }

        console.log('Pos: ' +  geoPositionValue + ' Inter: ' + geoRefreshIntervall);

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
                name: 'GPSRefresh',
                label: 'GPS Refresh Intervall: ' + geoRefreshIntervall,
                labelAlign: 'top',
                flex: 17,
                minValue: 5,
                maxValue: 120,
                increment: 5,
                listeners: {
                    change: function(object, sl, thumb, newValue, oldValue, eOpts ){
                       me.onChangeSliderIntervall(this, newValue);
                    }
                }
            }            
        };

        this.add([
        	toggleGPS,
        	sliderIntervall
        	])
	},

    onChangeSliderIntervall: function(self, newValue){
        console.log('View - Settings - SliderIntervall');
        this.fireEvent('changeSliderIntervallCommand', this, self, newValue);
    },

	onChangeToggleGPS: function(newValue){
		console.log('View - Settings - Toggle GPS');
		this.fireEvent('changeToggleGPSCommand', this, newValue);
	}
});