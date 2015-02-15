Ext.define('Reminder.controller.Settings', {
	extend: 'Ext.app.Controller',

	config: {

		refs: {
			settingsPanel: 'settingspanel'
		},	

		control:{
			settingsPanel:{		
				changeToggleGPSCommand: 'onChangeToggleGPSCommand',
				changeSliderIntervallCommand: 'onchangeSliderIntervallCommand',
				changeSliderGeoRadiusCommand: 'onChangeSliderGeoRadiusCommand',
				initSettingsStoreCommand: 'onInitSettingsStoreCommand'
			}
		}
	},

	onChangeSliderGeoRadiusCommand: function(object, self, newValue) {
		console.log('Controller - Settings - onChangeSliderGeoRadiusCommand');
		console.log(newValue);
		
		self.setLabel('Geo-Radius: ' + newValue + ' m');

		var settingsStore = Ext.getStore('Settings');


		var currentSettingsRecord = settingsStore.getAt(0);
		currentSettingsRecord.set('geoRadius', newValue);

		settingsStore.sync();

		Helper.setCurrentGeoRadius(newValue);
	},

	onchangeSliderIntervallCommand: function(object, self, newValue) {
		console.log('Controller - Settings - SliderIntervall ->' + newValue);
		
		self.setLabel('Check-Intervall: ' + newValue + ' s' );

		var settingsStore = Ext.getStore('Settings');

		console.log('Controller - Settings - Edit Settings');

		var currentSettingsRecord = settingsStore.getAt(0);
		currentSettingsRecord.set('refresh', newValue);

		settingsStore.sync();

		Helper.setCurrentRefreshRate(newValue*1000);
	},

	onChangeToggleGPSCommand: function(object, newValue){
		console.log('Controller - Settings - ToggleGPS ->' + newValue);

		var settingsStore = Ext.getStore('Settings');

		console.log('Controller - Settings - Edit Settings');

		var currentSettingsRecord = settingsStore.getAt(0);
		currentSettingsRecord.set('geoPosition', newValue);

		settingsStore.sync();
	},

	onInitSettingsStoreCommand: function(geoPositionValue, refreshValue){
		console.log('Controller - Settings - New Settings');

		var settingsStore = Ext.getStore('Settings');

		var newSettingsRecord = Ext.create('Reminder.model.Settings',{
			geoPosition: geoPositionValue,
			refresh: refreshValue
		});

		settingsStore.add(newSettingsRecord);

		settingsStore.sync();
	}, 

	launch: function() {
		this.callParent(arguments);
		console.log('Controller - Settings - launch');
	},

	init: function() {
		this.callParent(arguments);
		console.log('Controller - Settings - init');	
	}
});