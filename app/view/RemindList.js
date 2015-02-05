Ext.define('Reminder.view.RemindList', {
	extend: 'Ext.dataview.List',
	xtype: 'remindlist',

	config: {
		loadingText: 'Loading Reminds...',
		emptyText: 'No Reminds :(',
		onItemDisclosure: true,
		grouped: false,
		itemTpl: '<div>UpdatedAt: {updatedAt}</div><div class="item-title">{type} am {remindDateTime:date("d.m.Y H:i")}</div><div class="item-text"><p>Ort: {place}</p><p>Benachrichtigung: {notification}</p><p>SSID/MAC: {ssid_mac}</p><p>Nachricht: {message}</p></div>'
	}
});