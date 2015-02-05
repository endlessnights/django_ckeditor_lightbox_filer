# django_ckeditor_lightbox_filer
Plugin based on http://ckeditor.com/addon/lightbox plugin. Work with filer inside django
Installation
----------
  django-ckeditor==4.0.2
  django-filer==0.9.7

Installation
----------
Upload lightbox_filer folder on ckeditor/plugins
Turn on this plugin and add button for lightbox_filer in settings.py
    CKEDITOR_CONFIGS = {
      'default': {
        ...
        'extraPlugins': '..., lightbox_filer',
        ...
        'toolbar_for_default': [
        ...
          'items': [..., 'lightbox_filer']
        ...
        ]
      }
    }
