Ext.define('Reminder.store.Places', {
	extend: 'Ext.data.Store',

	config: {
		model: 'Reminder.model.Places',
		autoLoad: true,
		
		sorters: [
			{
				property: 'place', 
				direction: 'ASC'
			}
		],

		proxy: {
			type: 'localstorage',
			id: 'placesStore'
		}
	}
});