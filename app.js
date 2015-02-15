/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux', './ux');
Ext.Loader.setPath('Reminder.helper', './app/helper');

Ext.application({
    name: 'Reminder',

    requires: [
        'Ext.MessageBox'
    ],

    models: [
        'Reminds',
        'Places',
        'Wifis',
        'Notifications',
        'Settings'
    ],

    views: [
        'remind.RemindListContainer',
        'remind.RemindList',
        'remind.RemindEditor',
        'menu.MainMenu',        
        'wifi.WifiListContainer',
        'wifi.WifiList',
        'wifi.WifiEditor',
        'place.PlaceListContainer',
        'place.PlaceList',
        'place.PlaceEditor',
        'aboutus.AboutUs',
        'geomap.GeoMap',
        'setting.Settings',
        'setting.SettingsPanel',
        'howto.HowTo'
    ],

    controllers: [
        'Reminds',
        'MainMenu',
        'Places',
        'Wifis',
        'Settings'
    ],

    stores: [
        'Reminds',
        'Places',
        'Wifis',
        'Notifications',
        'Settings'
    ],

    icon: {
        '57': 'resources/icons/icon.png',
        '72': 'resources/icons/icon~ipad.png',
        '114': 'resources/icons/icon@2x.png',
        '144': 'resources/icons/icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var remindsListContainer = { xtype: 'remindlistcontainer' };
        var remindEditor = { xtype: 'remindeditor' };
        var placeListContainer = { xtype: 'placelistcontainer' };
        var mainMenu = Ext.create('Reminder.view.menu.MainMenu' );
        var placeEditor = { xtype: 'placeeditor' };
        var aboutUs = { xtype: 'aboutus' };

        var wifiListContainer = { xtype: 'wifilistcontainer' };
        var wifiList = { xtype: 'wifilist' };
        var wifiEditor = { xtype: 'wifieditor' };
        var geoMap = { xtype: 'geomap' };

        var settings = { xtype: 'settings'};

        var howTo = { xtype: 'howto' };

        
        Ext.Viewport.add( 
            [
                remindsListContainer, 
                remindEditor, 
                placeListContainer, 
                placeEditor,
                wifiListContainer,
                wifiList,
                wifiEditor,
                aboutUs,
                geoMap,
                settings,
                howTo
            ] 
        );
        Ext.Viewport.setMenu(mainMenu, { side: 'left', reveal: true });
        Helper.startCheckRemindTask();

    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
