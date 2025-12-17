#
# File name: py/health_check.py
#

import os
import sys
import requests

url = os.getenv("RENDER_HEALTH_URL")

if not url:
    print("RENDER_HEALTH_URL is missing")
    sys.exit(1)

try:
    response = requests.get(url, timeout=10)
    print("Status code:", response.status_code)

    if response.status_code != 200:
        print("Health check failed")
        sys.exit(1)

    print("Health check passed")

except Exception as e:
    print("Exception during health check:", str(e))
    sys.exit(1)

#
