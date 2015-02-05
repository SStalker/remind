Ext.define('Reminder.view.PlaceEditor', {
	extend: 'Ext.form.Panel',
	xtype: 'placeeditor',

	requires: [
		'Ext.form.FieldSet'
	],

	config: {
		scrollable: 'vertical'
	},

	initialize: function() {
		console.log('View - PlaceEditor - initialize');
		this.callParent(arguments);

		var me = this;

		var backButton = {
			xtype: 'button',
			text: 'Back to List',
			ui: 'back',			
			handler: me.onBackButtonTap,
			scope: me
		};

		var saveButton = {
			xtype: 'button',
			text: 'Save Place',
			ui: 'confirm-round',			
			handler: me.onSavePlaceButtonTap,
			scope: me
		};

		var topToolbar = {
			xtype: 'toolbar',
			docked: 'top',
			title: 'Edit Place',

			items: [
				backButton,
				{ xtype: 'spacer' },
				saveButton
			]
		};

		var deleteButton = {
			xtype: 'button',
			text: 'Delete',
			ui: 'decline-round',
			iconCls: 'trash',
			iconMask: true,
			handler: me.onDeletePlaceButtonTap,
			scope: me
		};

		var bottomToolbar = {
			xtype: 'toolbar',
			docked: 'bottom',
			items: [
				deleteButton
			]
		};

		var placeNameEditor = {
			xtype: 'fieldset',
			items: {
				xtype: 'textfield',
				name: 'place',
				label: 'Name',
				labelAlign: 'top',
				required: true
			}			
		};

		var geoCoordsLatitudeEditor = {
			xtype: 'fieldset',
			items: {
				xtype: 'textfield',
				name: 'latitude',
				label: 'Latitude',
				labelAlign: 'top',
				itemId: 'latitude',
				placeHolder: 'Autofilled',
				readOnly: true,
				required: true
			}
		};

		var geoCoordsLongitudeEditor = {
			xtype: 'fieldset',
			items: {
				xtype: 'textfield',
				name: 'longitude',
				label: 'Longitude',
				labelAlign: 'top',
				itemId: 'longitude',
				placeHolder: 'Autofilled',
				readOnly: true,
				required: true
			}
		};

		var geoCoordOpenMapButton = {
			xtype: 'button',
			name: 'openmapbutton',
			text: 'Choose a Location',
			ui: 'action',
			handler: this.onOpenMapButtonTap,
			scope: this
		};

		me.add(
			[
				topToolbar,
				{
					xtype: 'fieldset', 
					itemId: 'placeFieldset',
					items: [
						placeNameEditor,
						geoCoordsLatitudeEditor,
						geoCoordsLongitudeEditor,
						geoCoordOpenMapButton
					]
				},
				bottomToolbar
			]
		)
	},

	onSavePlaceButtonTap: function() {
		console.log('View - PlaceEditor - onSavePlaceButtonTap');
		this.fireEvent('savePlaceCommand', this);
	},

	onDeletePlaceButtonTap: function() {
		console.log('View - PlaceEditor - onDeletePlaceButtonTap');
		this.fireEvent('deletePlaceCommand', this);
	},

	onBackButtonTap: function() {
		console.log('View - PlaceEditor - onBackButtonTap');
		this.fireEvent('backCommand', this);
	},

	onOpenMapButtonTap: function() {
		console.log('View - PlaceEditor - onOpenMapButtonTap');
		this.fireEvent('openMapCommand', this);
	}
});