(function() {
    
	var pluginName = 'lightbox_filer';

	CKEDITOR.plugins.add(pluginName, {
        lang : 'en,pl',
		init : function(editor) {

			editor.addCommand(pluginName,new CKEDITOR.dialogCommand( 'lightbox_filer' ));

			CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/lightbox_filer.js' );

			editor.ui.addButton('lightbox_filer', {
				label : editor.lang.lightbox_filer.label,
				command : pluginName,
				icon : this.path + 'icon.png'
			});
		}
	});
})();