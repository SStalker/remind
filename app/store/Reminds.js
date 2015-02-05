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

		grouper: {
			sortProperty: 'createdAt',
			direction: 'DESC',
			groupFn: function(record) {
				if( record && record.data.createdAt )
					return record.data.createdAt;
				else
					return '';
			}
		},

		proxy: {
			type: 'localstorage',
			id: 'remindStore'
		}
	}
});