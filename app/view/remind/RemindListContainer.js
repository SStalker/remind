Ext.define('Reminder.view.remind.RemindListContainer', {
    extend: 'Ext.Container',
    
    xtype: 'remindlistcontainer',
    requires: [],
    
    config: { 
        layout: {
            type: 'fit'
        }
    },

    initialize: function() {
        this.callParent(arguments);

        var newButton = {
            xtype: 'button',
            text: 'New',
            ui: 'action',
            handler: this.onNewRemindButtonTap,
            scope: this
        };

        var menuButton = {
            xtype: 'button',
            text: 'Menu',
            ui: 'action',
            iconCls: 'list',
            handler: this.onMenuButtonTap,
            scope: this    
        };

        var topToolbar = {
            xtype: 'toolbar',
            docked: 'top',
            title: 'Reminds',
            items: [
                menuButton,
                {
                    xtype: 'spacer'
                },
                newButton
            ]
        };

        var remindList = {
            xtype: 'remindlist',
            store: Ext.getStore('Reminds'),
            listeners: {
                disclose: {
                    fn: this.onRemindListDisclose,
                    scope: this
                }
            }
        };

        this.add( [topToolbar, remindList] );
    },

    onNewRemindButtonTap: function() {
        // console.log('newRemindCommand');
        this.fireEvent('newRemindCommand', this);
    },

    onRemindListDisclose: function(list, record, target, index, evt, options) {
        // console.log('editRemindCommand');
        this.fireEvent('editRemindCommand', this, record);
    },

    onMenuButtonTap: function() {
        // console.log('tappedMenuButtonCommand');
        this.fireEvent('tappedMenuButtonCommand', this);
    }
});
