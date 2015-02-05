Ext.define('Reminder.model.Places',{
	extend: 'Ext.data.Model',

	config: {
		idProperty: 'id',
        identifier: 'sequential',
        
		fields: [
			{ name: 'id', type: 'int' },
			{ name: 'place', type: 'string' },
			{ name: 'latitude', type: 'string' },
			{ name: 'longitude', type: 'string' }
		],

		validations: [
			{ type: 'presence', field: 'id' },
			{ type: 'presence', field: 'place', message: 'Name is needed' },
			{ type: 'presence', field: 'latitude', message: 'Location is needed' },
			{ type: 'presence', field: 'longitude', message: 'Location is needed' }
		],


        associations: [
        	{ 
        		type: 'hasMany', 
        		associatedModel: 'Reminder.model.Reminds',
        		name: 'reminds' 
        	}
        ]
	}
});