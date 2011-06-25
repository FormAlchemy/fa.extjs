from fanstatic import Library, Resource, Group
from js import extjs

JS_FILES = ['js/ux/DynamicEditorGridPanel.js',
            'js/grid.js',
            'js/main.js', ]

library = Library('fa.extjs', '.')
groups = [Resource(library, file) for file in JS_FILES]
groups.append(extjs.basic_with_ux)
fa_extjs = Group(groups)
