Ext.ns('Fa.UI', 'Fa.Data');

Fa.Data.ModelComboJsonReader = Ext.extend(Ext.data.JsonReader, {
    extractData : function(root, returnRecords) {
        var rs = [];
        if (returnRecords === true) {
            var Record = this.recordType;
            Ext.iterate(root, function(item) {
            	var record = new Record({
            		id: root[item],
            		name:item,
            		url: root[item]
            	});
            	rs.push(record);
            })
        }
        return rs;
    }
});

Fa.UI.ModelsCombo = function(modelsGrid) {
	return new Ext.form.ComboBox({
		forceSelection : true,
		editable : false,
		lazyRender : true,
		triggerAction : 'all',
		store : new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : String.format('/demo/extjs/json/'),
				method : 'GET'
			}),
			autoLoad : true,
			reader : new Fa.Data.ModelComboJsonReader({
                fields: ['id', 'name', 'url'],
                root:'models'
			})
		}),
		fieldLabel : 'Model',
		allowBlank : false,
		msgTarget : 'side',
		valueField : 'id',
		name : 'model_id',
		displayField : 'name',
		listWidth : 'auto',
		tpl : new Ext.XTemplate('<tpl for="."><div class="combo-item">',
				'<h2>{name}</h2>', '{url}', '</div></tpl>'),
		itemSelector : 'div.combo-item',
		listeners : {
			'select' : function(combo, record, index) {
				modelsGrid.updateData(modelsGrid, record.data.url);
			}
		}
	});
}

Fa.UI.Grid = function() {
	return {
		xtype : 'dyneditorgrid',
		storeUrl : '/store_url',
		storeAutoLoad : false,
		storeRestful : true,
		title:'hi',
		id:'models-grid',
		rowNumberer : false,
		checkboxSelModel : true,
		sm : new Ext.grid.CheckboxSelectionModel({
			singleSelect : true,
			listeners : {
				selectionchange : function(sm) {
					this.grid.openButton.setDisabled(!sm.hasSelection());
				}
			}
		}),
		listeners : {
			rowdblclick : function(grid, index, e) {
				var sm = grid.getSelectionModel();
				if (sm.hasSelection()) {
					var record = sm.getSelected();
				}
			}
		},
		tbar : [{
			iconCls : 'silk-arrow-refresh',
			tooltip : 'Rafraichir',
			handler : function(btn, ev) {
				var grid = btn.ownerCt.ownerCt;
				grid.getStore().reload();
			}
		} ],
		view : new Ext.grid.GroupingView({
			hideGroupedColumn : false,
			forceFit : true,
			groupTextTpl : '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "éléments" : "élement"]})'
		}),
		updateData: function(grid, url) {
			grid.getStore().proxy.setUrl(url, true);
            grid.getStore().load();
		}

	};
};