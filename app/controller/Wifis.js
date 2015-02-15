Ext.define('Reminder.controller.Wifis', {
	extend: 'Ext.app.Controller',
	requires: [
		'Ext.data.proxy.LocalStorage',
		'Reminder.helper.Helper'
	],

	config: {
		refs: {
			wifiEditor: 'wifieditor',
			wifiListContainer: 'wifilistcontainer',
		},
		control: {
			wifiEditor: {
				saveWifiCommand: 'onSaveWifiCommand',
				deleteWifiCommand: 'onDeleteWifiCommand',
				backCommand: 'onBackCommand',
				changeWifiSsidCommand: 'onChangeWifiSsidCommand'
			},
			wifiListContainer: {
				editWifiCommand: 'onEditWifiCommand',
				newWifiCommand: 'onNewWifiCommand'
			}
		}
	},

	onNewWifiCommand: function() {
		console.log('Controller - Wifis - onNewWifiCommand');
		var me = this;

		var ssidSelect = this.getWifiEditor().query('#ssid')[0];
		var macSelect = this.getWifiEditor().query('#mac')[0];
		
		Helper.prepareWifiList(function(){
			var list = Helper.getWifiList();

			ssidSelect.setOptions(list.ssid);
			Helper.setCurrentMacList(list.mac);
			console.log('Controller - Wifis - onNewWifiCommand ' + list);


			// TODO Get a frsh list of current wifis 
			var newWifi = Ext.create('Reminder.model.Wifis', {		
				ssid: list.ssid[0],
				mac: list.mac[0]
			});

			me.activateWifiEditor(newWifi);	
		});
		
	},

	onSaveWifiCommand: function() {
		console.log('Controller - Wifis - onSaveWifiCommand');

		var wifiEditor = this.getWifiEditor();
		var ssidSelect = this.getWifiEditor().query('#ssid')[0];
		var currentWifi = wifiEditor.getRecord();
		var newValues = wifiEditor.getValues();

		var index = this.getIndexFromSelect(ssidSelect);


		var currentMac = Helper.getCurrentMacList()[index];

			currentWifi.set('ssid', newValues.ssid);
			currentWifi.set('mac', currentMac.mac);

			console.log(currentWifi);

			var errors = currentWifi.validate();

			if( !errors.isValid() ) {

				errors.each(function (item, index, length) {	            
		        	Ext.Msg.alert('Error!', item.getMessage(), Ext.emptyFn);
		        });

				currentWifi.reject();
				return;
			}


		
		var wifiStore = Ext.getStore('Wifis');

		if( wifiStore.findRecord('mac', currentWifi.data.mac) == null ) {
			console.log('Controller - Wifis - onSaveWifiCommand add');
			wifiStore.add(currentWifi);
		}

			wifiStore.sync();

		
		this.activateWifiList();
	},

	onDeleteWifiCommand: function() {
		console.log('Controller - Wifis - onDeleteWifiCommand');
		
		var wifiEditor = this.getWifiEditor();
		var currentWifi = wifiEditor.getRecord();
		var wifiStore = Ext.getStore('Wifis');

			wifiStore.remove(currentWifi);
			wifiStore.sync();

		this.activateWifiList();
	},

	onBackCommand: function() {
		console.log('Controller - Wifis - onBackCommand');

		this.activateWifiList();
	},

	onEditWifiCommand: function(list, record) {
		console.log('Controller - Wifis - onEditWifiCommand');
		this.activateWifiEditor(record);
	},

	onChangeWifiSsidCommand: function(select, val) {
		console.log('Controller - Wifis - onChangeWifiSsidCommand');
	},

	onChangeWifiMacCommand: function(select, val) {
		console.log('Controller - Wifis - onChangeWifiMacCommand');
		
	},

	activateWifiEditor: function(record) {
		var wifiEditor = this.getWifiEditor();

			console.log(wifiEditor);
			wifiEditor.setRecord(record);

			console.log(record);
		

		Ext.Viewport.animateActiveItem( wifiEditor, { type: 'slide', direction: 'left' } );
	},

	activateWifiList: function() {
		var wifiList = this.getWifiListContainer();

		Ext.Viewport.animateActiveItem( wifiList, { type: 'slide', direction: 'right' } );
	},

	getIndexFromSelect: function(select) {

		var currentElement = select.getRecord().get('ssid');
		var counter = 0;

		select.getStore().each(function(rec) {
    		if( currentElement == rec.get('ssid') )
    			return false;

    		counter++;
		});

		return counter;
		
	},

	initialize: function() {
		console.log('Controller - Wifis - init');
	},

	launch: function() {
		console.log('Controller - Wifis - launch');
	}
	
});