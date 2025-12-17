#
# File name: py/send_alert_email.py
# This will send an email when the health check fails.

import os
import smtplib
from email.message import EmailMessage
from datetime import datetime

sender = os.getenv("SENDER_EMAIL")
password = os.getenv("SENDER_EMAIL_PASSWORD")
receiver = os.getenv("RECEIVER_EMAIL")
url = os.getenv("RENDER_HEALTH_URL")

if not all([sender, password, receiver, url]):
    print("Missing email environment variables")
    exit(1)

msg = EmailMessage()
msg["From"] = sender
msg["To"] = receiver
msg["Subject"] = "Render Health Check Failed"

msg.set_content(
    f"""
Render health check failed.

Service URL:
{url}

Time:
{datetime.utcnow()} UTC

Please check Render logs and service status.
"""
)

try:
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender, password)
        server.send_message(msg)

    print("Alert email sent successfully")

except Exception as e:
    print("Failed to send email:", str(e))
    exit(1)

#
