Ext.define('Reminder.view.PlaceList', {
	extend: 'Ext.dataview.List',
	xtype: 'placelist',

	config: {
		loadingText: 'Loading Places...',
		emptyText: 'No Places :(',
		onItemDisclosure: true,
		grouped: false,
		itemTpl: '<div>{place}</div>'
	}
});