Ext.define('Reminder.view.WifiList', {
	extend: 'Ext.dataview.List',
	xtype: 'wifilist',

	config: {
		loadingText: 'Loading Wifis...',
		emptyText: 'No Wifis :(',
		onItemDisclosure: true,
		grouped: false,
		itemTpl: '<div>{ssid}, {mac}</div>'
	}
});