Ext.define('Reminder.controller.Reminds', {
	extend: 'Ext.app.Controller',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],

	config: {

		refs: {
			remindsListContainer: 'remindlistcontainer',
			remindEditor: 'remindeditor',
			remindMainMenu: 'remindmainmenu',
			wifiSelectField: 'fieldset #ssid_mac'
		},

		control: {
			remindsListContainer: {
				newRemindCommand: 'onNewRemindCommand',
				editRemindCommand: 'onEditRemindCommand',
			},
			remindEditor: {
				saveRemindCommand: 'onSaveRemindCommand',
				deleteRemindCommand: 'onDeleteRemindCommand',
				backCommand: 'onBackCommand',
				changeRemindTypeCommand: 'onChangeRemindTypeCommand'
			}
		}
	},

	onNewRemindCommand: function() {
		console.log('Controller - Reminds - onNewRemindCommand');

		var now = Ext.util.Format.date(new Date(), 'd.m.Y H:i');


		var newRemind = Ext.create('Reminder.model.Reminds', {
			type: 'Normal',
			remindDateTime: now,
			updatedAt: now,
			createdAt: now,

			notification: {
				store: Ext.getStore('Notifications')[0],
				displayField: 'name',
				valueField: 'name'
			},			
			message: ''
		});

		console.log(newRemind);

		this.activateRemindEditor(newRemind);

	},

	onEditRemindCommand: function(list, record) {
		console.log('Controller - Reminds - onEditRemindCommand');
		//console.log()
		this.activateRemindEditor(record);
	},

	onDeleteRemindCommand: function() {
		console.log('Controller - Reminds - onDeleteRemindCommand');
		
		var remindEditor = this.getRemindEditor();
		var currentRemind = remindEditor.getRecord();
		var remindStore = Ext.getStore('Reminds');

		remindStore.remove(currentRemind);
		remindStore.sync();

		this.activateRemindList();

	},

	onBackCommand: function() {
		console.log('Controller - Reminds - onBackCommand');

		this.activateRemindList();
	},

	activateRemindEditor: function(record) {
		var remindEditor = this.getRemindEditor();

		remindEditor.setRecord(record);

		console.log(record);
		Ext.Viewport.animateActiveItem( remindEditor, { type: 'slide', direction: 'left' } );
	},

	onSaveRemindCommand: function() {
		console.log('Controller - Reminds - onSaveRemindCommand');

		var remindEditor = this.getRemindEditor();

		var currentRemind = remindEditor.getRecord();
		var newValues = remindEditor.getValues();

		currentRemind.set('type', newValues.type);
		currentRemind.set('message', newValues.message);
		currentRemind.set('place', newValues.place);
		currentRemind.set('remindDateTime', newValues.remindDateTime);
		currentRemind.set('updatedAt', Ext.util.Format.date(new Date(), 'd.m.Y H:i'));
		currentRemind.set('notification', newValues.notification);
		currentRemind.set('ssid_mac', newValues.ssid_mac);

		var errors = currentRemind.validate();

		console.log(currentRemind);
		//console.log(newValues);

		if( !errors.isValid() ) {
			errors.each(function (item, index, length) {	            
	        	Ext.Msg.alert('Error!', item.getMessage(), Ext.emptyFn);
	        });

			currentPlace.reject();
			return;
		}

		// Costum validations
		if( newValues.type == "Normal" ) {
			
			if( newValues.remindDateTime == "" ){
				Ext.Msg.alert('Error!', 'No dateTime', Ext.emptyFn);

				currentPlace.reject();
				return;
			}

		} else if( newValues.type == "Geo Remind" ) {
			
			if( newValues.place === null ) {
				Ext.Msg.alert('Error!', 'No Place', Ext.emptyFn);
				currentPlace.reject();
				return;				
			}

		} else {

			if( newValues.ssid_mac === null ) {
				Ext.Msg.alert('Error!', 'No SSID', Ext.emptyFn);
				currentPlace.reject();
				return;				
			}

		}


		var remindStore = Ext.getStore('Reminds');

		if( remindStore.findRecord('id', currentRemind.data.id) == null ) 
			remindStore.add(currentRemind);
		

		remindStore.sync();
		this.activateRemindList();
	},

	onChangeRemindTypeCommand: function(select, newVal, oldVal ) {
		console.log('Controller - Reminds - onChangeRemindTypeCommand');
		console.log(newVal);
		var remindEditor = this.getRemindEditor();
		var form = remindEditor.getComponent('remindFieldset');

		var remindDateTime = form.getComponent('remindDateTime');
		var remindPlace = form.getComponent('place');
		var remindSsidMac = form.getComponent('ssid_mac');

		switch( newVal ) {
			case 'Normal': 
					remindDateTime.setHidden(false);
					remindPlace.setHidden(true);
					remindSsidMac.setHidden(true);
					break;
			case 'Geo Remind': 
					remindDateTime.setHidden(true);
					remindPlace.setHidden(false);
					remindSsidMac.setHidden(true);
					break;
			case 'Wifi Remind': 
					remindDateTime.setHidden(true);
					remindPlace.setHidden(true);
					remindSsidMac.setHidden(false);
					break;
		}
	},

	onTappedMenuButtonCommand: function() {
		console.log('Controller - Reminds - onTappedMenuButtonCommand');
		var menu = this.getRemindMainMenu();

		if( menu.isHidden() )
			Ext.Viewport.showMenu('left');
		else
			Ext.Viewport.hideMenu('left');

	},

	activateRemindList: function() {
		Ext.Viewport.animateActiveItem( this.getRemindsListContainer(), { type: 'slide', direction: 'right' } );
	},

	launch: function() {
		this.callParent(arguments);
		Ext.getStore('Reminds').load();
		console.log('Controller - Reminds - launch');
	},

	init: function() {
		this.callParent(arguments);
		console.log('Controller - Reminds - init');	
	}
});