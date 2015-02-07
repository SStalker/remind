Ext.define('Reminder.store.Reminds', {
	extend: 'Ext.data.Store',

	config: {
		model: 'Reminder.model.Reminds',
		autoLoad: true,
		sorters: [
			{
				property: 'createdAt', 
				direction: 'DESC'
			}
		],

		proxy: {
			type: 'localstorage',
			id: 'remindStore'
		}
	}
});