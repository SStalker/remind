Ext.define('Reminder.model.Wifis', {
	extend: 'Ext.data.Model',

	config: {

		idProperty: 'id',
		identifier: 'uuid',

		fields: [
			{ name: 'id', type: 'string' },
			{ name: 'ssid', type: 'string' },
			{ name: 'mac', type: 'string' }
		]
	}
});