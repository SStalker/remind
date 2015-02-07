Ext.define('Reminder.view.WifiList', {
	extend: 'Ext.dataview.List',
	xtype: 'wifilist',

	config: {
		loadingText: 'Loading Wifis...',
		emptyText: 'No Wifis :(',
		onItemDisclosure: true,
		grouped: false,
		itemTpl: '<div class="wifi-ssid">SSID: <span>{ssid}</span></div> \
				  <div class="wifi-mac">MAC: <span>{mac}</span></div>'
	}
});