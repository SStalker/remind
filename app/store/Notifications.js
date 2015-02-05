Ext.define('Reminder.store.Notifications', {
	extend: 'Ext.data.Store',

	config: {
		model: 'Reminder.model.Notifications',
		proxy: {
			type: 'localstorage',
			id: 'notificationsStore'
		},

		data: [
			{ id: 0, name: 'Ringtone' },
			{ id: 1, name: 'Only vibrate' },
			{ id: 2, name: 'Vibrate & Ringtone' }
		]
	}
});