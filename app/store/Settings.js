Ext.define('Reminder.store.Settings', {
	extend: 'Ext.data.Store',

	config: {
		model: 'Reminder.model.Settings',
		autoLoad: true,
		
		proxy: {
			type: 'localstorage',
			id: 'settingsStore'
		}
	}
});