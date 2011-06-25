Ext.onReady(function() {
	Ext.QuickTips.init();

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
			tbar:[Fa.UI.ModelsCombo()],
			items : [ Fa.UI.Grid()]
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
