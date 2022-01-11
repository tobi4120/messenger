release: python manage.py migrate
web: daphne msg_app.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker channels --settings=msg_app.settings -v2