__all__ = ["AuthView", "ConfigureView"]

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.request import Request

from sentry.plugins.base.view import PluggableViewMixin
from sentry.web.frontend.base import BaseView


@method_decorator(csrf_exempt, name='dispatch')
class AuthView(BaseView):
    """
    A segment of Provider's auth pipeline.

    See ``BaseView`` for capabilities.
    """

    auth_required = False
    sudo_required = False

    def get_ident(self):
        cls = type(self)
        return f"{cls.__module__}.{cls.__name__}"


@method_decorator(csrf_exempt, name='dispatch')
class ConfigureView(BaseView, PluggableViewMixin):
    """ """

    def dispatch(self, request: Request, organization, auth_provider):
        return ""
