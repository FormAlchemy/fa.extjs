# -*- coding: utf-8 -*-
from pyramid_formalchemy.views import ModelView as Base
from pyramid.renderers import render_to_response
from fa.extjs.fanstatic_resources import fa_extjs
from js.extjs import theme

class ModelView(Base):

    def __init__(self, context, request):
        Base.__init__(self, context, request)
        fa_extjs.need()
        theme.gray.need()

    def render(self, *args, **kwargs):
        results = Base.render(self, *args, **kwargs)
        if self.request.format == 'html':
            results.update(request=self.request)
            return render_to_response('fa.extjs:index.pt', results)
        return results

