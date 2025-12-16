#
#

import os
import smtplib
from email.message import EmailMessage

# get sender
input_name = os.getenv("GHACTION_POSTMAN")
input_value = os.getenv("GHACTION_MAIL")

# get receiver
output_name = os.getenv("GHACTION_HOME")

# Safety check to make sure secrets are available
# If secrets are missing, stop execution immediately
if not input_name or not input_value or not output_name:
    raise RuntimeError("Email credentials are missing")

# Create an email message object
msg = EmailMessage()

# Set sender address
msg["From"] = input_name

# Set receiver address
msg["To"] = output_name

# Set email subject
msg["Subject"] = "GitHub Action Notification"

# Set email body content
msg.set_content("Your GitHub Action has completed successfully.")

# Connect to Gmail SMTP server using TLS encryption
with smtplib.SMTP("smtp.gmail.com", 587) as server:
    # Start secure encrypted connection
    server.starttls()

    # Login using sender email and App Password
    server.login(input_name, input_value)

    # Send the email message
    server.send_message(msg)

#
