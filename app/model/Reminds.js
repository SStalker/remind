Ext.define('Reminder.model.Reminds', {
	extend: 'Ext.data.Model',

	config: {
		/*
			We will use the idProperty config to establish that the id field is actually the field the framework can use to uniquely identify a note
		*/
		idProperty: 'id',
        identifier: 'sequential',
		
		fields: [
			{ name: 'id', 				type: 'int' },
			{ name: 'type', 			type: 'string' },
			{ name: 'remindDateTime', 	type: 'date', dateFormat: 'd.m.Y H:i' },
			{ name: 'notification', 	type: 'string' },
			{ name: 'place', 			type: 'string' },
			{ name: 'ssid_mac',			type: 'string' },
			{ name: 'createdAt', 		type: 'string' },
			{ name: 'updatedAt', 		type: 'string' },
			{ name: 'message', 			type: 'string' },
			{ name: 'places_id', 		type: 'int' }
		],

		validations: [
			{ type: 'presence', field: 'id' },
			{ type: 'presence', field: 'createdAt' },
			{ type: 'presence', field: 'type' },
			{ type: 'presence', field: 'message', message: 'Please enter a message' }
		],

		associations: [
			{ 
				type: 'belongsTo', 
				model: 'Reminder.model.Places', 
				name: 'place' 
			}
		]
	}
});