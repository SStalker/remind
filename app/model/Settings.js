Ext.define('Reminder.model.Settings', {
	extend: 'Ext.data.Model',

	config: {

		idProperty: 'id',
		identifier: 'uuid',

		fields: [
			{ name: 'geoPosition', type: 'bool' },
			{ name: 'refresh', type: 'number' },
			{ name: 'geoRadius', type: 'number' }
		]
	}
});