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
				initSettingsStoreCommand: 'onInitSettingsStoreCommand'
			}
		}
	},

	onchangeSliderIntervallCommand: function(object, self, newValue){
		console.log('Controller - Settings - SliderIntervall ->' + newValue);
		
		self.setLabel('GPS Refresh Intervall: ' + newValue);

		var settingsStore = Ext.getStore('Settings');

		console.log('Controller - Settings - Edit Settings');

		var currentSettingsRecord = settingsStore.getAt(0);
		currentSettingsRecord.set('geoRefresh', newValue);

		settingsStore.sync();
	},

	onChangeToggleGPSCommand: function(object, newValue){
		console.log('Controller - Settings - ToggleGPS ->' + newValue);

		var settingsStore = Ext.getStore('Settings');

		console.log('Controller - Settings - Edit Settings');

		var currentSettingsRecord = settingsStore.getAt(0);
		currentSettingsRecord.set('geoPosition', newValue);

		settingsStore.sync();
	},

	onInitSettingsStoreCommand: function(geoPositionValue, geoRefreshValue){
		console.log('Controller - Settings - New Settings');

		var settingsStore = Ext.getStore('Settings');

		var newSettingsRecord = Ext.create('Reminder.model.Settings',{
			geoPosition: geoPositionValue,
			geoRefresh: geoRefreshValue
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