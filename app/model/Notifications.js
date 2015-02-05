Ext.define('Reminder.model.Notifications', {
	extend: 'Ext.data.Model',

	config: {

		idProperty: 'id',
		identifier: 'uuid',

		fields: [
			{ name: 'id', type: 'string' },
			{ name: 'name', type: 'string' }
		]
	}
});