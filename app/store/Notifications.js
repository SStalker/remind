Ext.define('Reminder.store.Notifications', {
	extend: 'Ext.data.Store',

	config: {
		model: 'Reminder.model.Notifications',
		proxy: {
			type: 'localstorage',
			id: 'notificationsStore'
		},

		data: [
			{ id: 'bal', name: 'Ringtone' },
			{ id: 'asdfd', name: 'Only vibrate' },
		]
	}
});