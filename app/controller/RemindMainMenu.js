Ext.define('Reminder.controller.RemindMainMenu', {
	extend: 'Ext.app.Controller',

	config: {

		refs: {
			remindsListContainer: 'remindlistcontainer',
			remindMainMenu: 'remindmainmenu',
			remindPlaceListContainer: 'remindplacelistcontainer',
			wifiListContainer: 'wifilistcontainer',
			howToCarousel: 'howto',
			aboutUs: 'aboutus',
			geoMap: 'geomap',
			settings: 'settings'
		},

		control: {
			remindMainMenu: {
				tappedRemindListButtonCommand: 'onTappedRemindListButtonCommand',
				tappedSettingsButtonCommand: 'onTappedSettingsButtonCommand',
				tappedPlacesListButtonCommand: 'onTappedPlacesListButtonCommand',
				tappedWifiListButtonCommand: 'onTappedWifiListButtonCommand',
				tappedHowToButtonCommand: 'onTappedHowToButtonCommand',
				tappedAboutUsButtonCommand: 'onTappedAboutUsButtonCommand'				
			},

			howToCarousel: {
				tappedMenuButtonCommand: 'onTappedMenuButtonCommand'
			},
			
			aboutUs: {
				tappedMenuButtonCommand: 'onTappedMenuButtonCommand'
			},

			remindsListContainer: {
				tappedMenuButtonCommand: 'onTappedMenuButtonCommand'
			},

			remindPlaceListContainer: {
				tappedMenuButtonCommand: 'onTappedMenuButtonCommand'
			},

			wifiListContainer: {
				tappedMenuButtonCommand: 'onTappedMenuButtonCommand'	
			},
			geoMap: {
				tappedMenuButtonCommand: 'onTappedMenuButtonCommand'	
			},
			settings: {
				tappedMenuButtonCommand: 'onTappedMenuButtonCommand'	
			}
		}
	},

	onTappedRemindListButtonCommand: function() {
		console.log('Controller - RemindMainMenu - onTappedRemindListButtonCommand');
		this.activateRemindList();
	},

	onTappedSettingsButtonCommand: function() {

		console.log('Controller - RemindMainMenu - onTappedSettingsButtonCommand');
		this.activateSettings();
	},

	onTappedPlacesListButtonCommand: function() {
		console.log('Controller - RemindMainMenu - onTappedPlacesListButtonCommand');

		this.activatePlaceList();
	},

	onTappedWifiListButtonCommand: function() {
		console.log('Controller - RemindMainMenu - onTappedWifiListButtonCommand');

		this.activateWifiList();	
	},

	onTappedHowToButtonCommand: function() {
		console.log('Controller - RemindMainMenu - onTappedHowToButtonCommand');		
		this.activateHowToSite();
	},

	onTappedAboutUsButtonCommand: function() {
		console.log('Controller - RemindMainMenu - onTappedAboutUsButtonCommand');
		this.activateAboutUs();
	},

	onTappedMenuButtonCommand: function() {
		console.log('Controller - RemindMainMenu - onTappedMenuButtonCommand');
		var menu = this.getRemindMainMenu();

		if( menu.isHidden() )
			Ext.Viewport.showMenu('left');
		else
			Ext.Viewport.hideMenu('left');

	},

	activateWifiList: function() {
		var wifiList = this.getWifiListContainer();

		Ext.Viewport.hideMenu('left');
		Ext.Viewport.animateActiveItem( wifiList, { type: 'slide', direction: 'right' } );
	},

	activatePlaceList: function() {
		var placeList = this.getRemindPlaceListContainer();

		Ext.Viewport.hideMenu('left');
		Ext.Viewport.animateActiveItem( placeList, { type: 'slide', direction: 'right' } );
	},

	activateRemindList: function() {

		var remindsList = this.getRemindsListContainer();

		Ext.Viewport.hideMenu('left');
		Ext.Viewport.animateActiveItem( remindsList, { type: 'slide', direction: 'right' } );
	},

	activateHowToSite: function() {
		var howToCarousel = this.getHowToCarousel();
		Ext.Viewport.hideMenu('left');
		Ext.Viewport.animateActiveItem( howToCarousel, { type: 'slide', direction: 'right' } );
	},

	activateAboutUs: function() {
		var aboutUs = this.getAboutUs();

		Ext.Viewport.hideMenu('left');
		Ext.Viewport.animateActiveItem( aboutUs, { type: 'slide', direction: 'right' } );
	},

	activateSettings: function() {
		var settings = this.getSettings();

		Ext.Viewport.hideMenu('left');
		Ext.Viewport.animateActiveItem( settings, { type: 'slide', direction: 'right' } );
	},

	initialize: function() {
		console.log('Controller - RemindMainMenu - initialize');
	},

	launch: function() {
		console.log('Controller - RemindMainMenu - launch');	
	}
});