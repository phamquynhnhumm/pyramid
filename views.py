from html import escape

from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.view import view_config, view_defaults


@view_config(route_name='home')
def home_view(request):
    return Response('<p>Visit <a href="/howdy/lisa">hello</a></p>')

# @view_config(route_name='hello', renderer='hello_world.pt')
# @view_config(route_name='hello', renderer='hello_world.jinja2')
# def hello_view(request):
#    return dict(name=request.matchdict['name'])

@view_config(route_name='redirect')
def redirect_view(request):
    raise Exception()

@view_config(route_name='hello_json', renderer='json')
def hello_json(request):
    return [1, 2, 3]

@view_defaults(route_name='hello')
class HelloWorldViews:
    def __init__(self, request):
        self.request = request
        self.name = request.matchdict['name']

    @view_config(renderer='hello.jinja2')
    def hello_view(self):
        return dict()

    @view_config(request_param='form.edit', renderer='edit.jinja2')
    def edit_view(self):
        print('Edit')
        return dict()

    @view_config(request_param='form.delete', renderer='delete.jinja2')
    def delete_view(self):
        print('Deleted')
        return dict()
