Ext.define('Reminder.model.Notifications', {
	extend: 'Ext.data.Model',

	config: {

		idProperty: 'id',
		identifier: 'sequential',

		fields: [
			{ name: 'id', type: 'int' },
			{ name: 'name', type: 'string' }
		]
	}
});