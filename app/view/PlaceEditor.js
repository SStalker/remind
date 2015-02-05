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
			ui: 'back',
			text: 'Back to List',
			handler: me.onBackButtonTap,
			scope: me
		};

		var saveButton = {
			xtype: 'button',
			ui: 'action',
			text: 'Save Place',
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
			xtype: 'textfield',
			name: 'place',
			label: 'Name',
			required: true
		};

		var geoCoordsLatitudeEditor = {
			xtype: 'textfield',
			name: 'latitude',
			itemId: 'latitude',
			hidden: false,
			readOnly: true,
			required: true
		};

		var geoCoordsLongitudeEditor = {
			xtype: 'textfield',
			name: 'longitude',
			itemId: 'longitude',
			hidden: false,
			readOnly: true,
			required: true
		};

		var geoCoordOpenMapButton = {
			xtype: 'button',
			name: 'openmapbutton',
			text: 'Choose a Location',
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