Ext.define('Reminder.store.Wifis', {
	extend: 'Ext.data.Store',

	config: {
		model: 'Reminder.model.Wifis',
		autoLoad: true,
		proxy: {
			type: 'localstorage',
			id: 'wifiStore'
		}
	}
});