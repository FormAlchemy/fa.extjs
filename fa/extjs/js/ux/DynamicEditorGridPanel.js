/**
 * dynamic editor grid panel
 * adapted from http://erhanabay.com/2009/01/29/dynamic-grid-panel-for-ext-js/
 */
Ext.ns("Ext.ux");
Ext.ux.DynamicEditorGridPanel = Ext.extend(Ext.grid.EditorGridPanel, {
    initComponent: function(){
        /**
         * Default configuration options.
         *
         * You are free to change the values or add/remove options.
         * The important point is to define a data store with JsonReader
         * without configuration and columns with empty array. We are going
         * to setup our reader with the metaData information returned by the server.
         * See http://extjs.com/deploy/dev/docs/?class=Ext.data.JsonReader for more
         * information how to configure your JsonReader with metaData.
         *
         * A data store with remoteSort = true displays strange behaviours such as
         * not to display arrows when you sort the data and inconsistent ASC, DESC option.
         * Any suggestions are welcome
         */
        var defaultConfig = {
            storeAutoLoad: true,
            storeRestful: false
        };
        Ext.applyIf(this, defaultConfig);
        
        
        var config = {
            viewConfig: {
                forceFit: true
            },
            enableColLock: false,
            loadMask: true,
            border: false,
            stripeRows: true,
            clicksToEdit: 1,
            store: new Ext.data.GroupingStore({
                url: this.storeUrl,
                restful: this.storeRestful,
                autoLoad: this.storeAutoLoad,
                reader: new Ext.data.JsonReader(),
                listeners: this.storeListeners
            }),
            columns: []
        };
        Ext.apply(this, config);
        Ext.apply(this.initialConfig, config);
        Ext.ux.DynamicEditorGridPanel.superclass.initComponent.apply(this, arguments);
    },
    onRender: function(ct, position){
        this.colModel.defaultSortable = true;
        Ext.ux.DynamicEditorGridPanel.superclass.onRender.call(this, ct, position);
        /**
         * Grid is not masked for the first data load.
         * We are masking it while store is loading data
         */
        if (this.store.autoLoad) {
        	this.el.mask('Loading...');
        } else {
        	this.el.mask();
        }
        this.store.on('load', function(){
            /**
             * Thats the magic! <img src="http://erhanabay.com/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley">
             *
             * JSON data returned from server has the column definitions
             */
            if (typeof(this.store.reader.jsonData.columns) === 'object') {
                var columns = [];
                /**
                 * Adding RowNumberer or setting selection model as CheckboxSelectionModel
                 * We need to add them before other columns to display first
                 */
                if (this.rowNumberer) {
                    columns.push(new Ext.grid.RowNumberer());
                }
                if (this.checkboxSelModel) {
                    columns.push(new Ext.grid.CheckboxSelectionModel());
                }
                Ext.each(this.store.reader.jsonData.columns, function(column){
                    columns.push(column);
                });

                /**
                 * Setting column model configuration
                 */
                this.getColumnModel().setConfig(columns);
            }
            /**
             * Unmasking grid
             */
            this.el.unmask();
        }, this);
        /**
         * And finally load the data from server!
         */
        if (this.storeAutoLoad) {
            this.store.load();
        }
    }
});
Ext.reg('dyneditorgrid', Ext.ux.DynamicEditorGridPanel); 
