Ext.define('Reminder.view.RemindList', {
	extend: 'Ext.dataview.List',
	xtype: 'remindlist',

	config: {
		loadingText: 'Loading Reminds...',
		emptyText: 'No Reminds :(',
		onItemDisclosure: true,
		grouped: false,
		itemTpl: new Ext.XTemplate(
				'<div class="remind-container">',
					'<tpl switch="type">',
						'<tpl case="Normal">',
							'<div class="remind-icon-normal"></div>',
						'<tpl case="Geo Remind">',
							'<div class="remind-icon-place"></div>',
						'<tpl case="Wifi Remind">',
							'<div class="remind-icon-wifi"></div>',
					'</tpl>',
					'<div class="remind-content">',
						'<div class="remind-title">Type: <span>{type}</span></div> ',
						'<div class="remind-item-text">',
							
							'<div class="remind-notificationAt">Notification at: <span>{remindDateTime:date("d.m.Y H:i")}</span></div>',
							'<div class="remind-notificationType">Notificationtype: <span>{notification}</span></div>',

							'<tpl if="place">',
								'<div class="remind-place">Place: <span>{place}</span></div>',
							'</tpl>',
							'<tpl if="ssid_mac">',
								'<div class="remind-ssid">SSID/MAC: <span>{ssid_mac}</span></div>',
							'</tpl>',
								'<div class="remind-message">Message: <span>{message}</span></div>',
						'</div>',
					'</div>',
				'</div>' )
	}
});