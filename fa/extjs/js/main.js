Ext.onReady(function() {
	Ext.QuickTips.init();

	var modelsGrid = Ext.ComponentMgr.create(Fa.UI.Grid());
	
	var mainPanel = new Ext.Viewport({
		id : 'main-viewport',
		forceFit : true,
		hideMode : "offsets",
		layout : "border",
		defaults : {
			autoScroll : true
		},
		items : [ {
			region : 'north',
			xtype : 'panel',
			border : false,
			html : 'north',
			bodyStyle : 'height:70px;'
		}, {
			xtype : 'panel',
			layout : 'card',
			id : 'main-tabpanel',
			region : 'center',
			activeItem : 0,
			border : false,
			tbar:[Fa.UI.ModelsCombo(modelsGrid)],
			items : [modelsGrid]
		} ],
		listeners : {
			afterrender : function(component) {
				var params = document.URL.split('#');
				if (params.length > 1) {
					var token = params[1];
				}
			}

		}
	});
});
