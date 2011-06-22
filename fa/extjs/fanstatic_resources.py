# -*- coding: utf-8 -*-
from fanstatic import Library, Resource
from js import extjs

library = Library('fa.extjs', '.')

fa_extjs = Resource(library, 'fa.extjs.js', depends=[extjs.basic_with_ux])

