# -*- coding: utf-8 -*-
from pyramid_formalchemy.views import ModelView as Base
from pyramid.renderers import render_to_response
from pyramid.response import Response
from formalchemy.fields import _pk
from fa.extjs.fanstatic_resources import fa_extjs
from js.extjs import theme
import simplejson as json
import datetime

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.isoformat()
        else:
            return json.JSONEncoder.default(self, obj)


class ModelView(Base):

    encoder = JSONEncoder()
    types = dict(
            slider='int',
            color='string',
            unicode='string',
        )
    xtypes = dict(
            unicode='textfield',
            slider='slider',
            color='colorpalette',
            date='datepicker',
            datetime='datepicker',
        )

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

    def update_grid(self, *args, **kwargs):
        pass

    def listing(self, *args, **kwargs):
        request = self.request
        if request.format != 'json':
            return Base.listing(self, *args, **kwargs)
        page = self.get_page(**kwargs)
        fs = self.get_grid()
        fs = fs.bind(instances=page, request=self.request)
        columns = []
        fields = []
        for field in fs.render_fields.values():
            type = field.type.__class__.__name__.lower()
            columns.append(dict(
                      dataIndex=field.name, header=field.label(),
                      editor=dict(xtype=self.types.get(type, '%sfield' % type)),
                      width=160, fixed=False
                   ))
            fields.append(dict(name=field.name, type=self.types.get(type, type)))

        values = []
        for item in page:
            pk = _pk(item)
            fs._set_active(item)
            value = dict(id=pk,
                         absolute_url=request.fa_url(request.model_name, request.format, pk))
            value.update(fs.to_dict(with_prefix=bool(request.params.get('with_prefix'))))
            values.append(value)

        data = dict(columns=columns, metaData=dict(fields=fields), records=values)
        return Response(self.encoder.encode(data),
                        content_type='application/json')
