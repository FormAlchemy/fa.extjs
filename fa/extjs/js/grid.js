Ext.ns('Fa.UI');
Fa.UI.Grid = function(){
    return {
        xtype: 'dyneditorgrid',
        storeUrl: '/store_url',
        storeAutoLoad: true,
        storeRestful: true,
        rowNumberer: false,
        checkboxSelModel: true,
        sm: new Ext.grid.CheckboxSelectionModel({
            singleSelect: true,
            listeners: {
                selectionchange: function(sm){
                    this.grid.openButton.setDisabled(!sm.hasSelection());
                }
            }
        
        }),
        listeners: {
            rowdblclick: function(grid, index, e){
                var sm = grid.getSelectionModel();
                if (sm.hasSelection()) {
                    var record = sm.getSelected();
                }
            }
        },
        tbar: [{
            iconCls: 'silk-arrow-refresh',
            tooltip: 'Rafraichir',
            handler: function(btn, ev){
                var grid = btn.ownerCt.ownerCt;
                grid.getStore().reload();
            }
        }],
        view: new Ext.grid.GroupingView({
            hideGroupedColumn: false,
            forceFit: true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "éléments" : "élement"]})'
        })
    };
};