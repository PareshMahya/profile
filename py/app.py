#
# File Name: py/app.py
#

import os
import smtplib
from flask import Flask, request, redirect
from flask_cors import CORS
from email.message import EmailMessage

app = Flask(__name__)
CORS(app)  # This allows your GitHub Pages site to talk to this API

@app.route("/", methods=["GET", "HEAD"])
def home():
    return "Backend is running", 200

# Optional health check endpoint for Render (safe to expose)
@app.route("/healthz")
def healthz():
    return "ok", 200

@app.route("/contact", methods=["POST"])
def contact():
    """
    This endpoint receives data from the website contact form.
    It sends the message as an email using values provided
    securely via environment variables.
    """
    print("POST /contact received")
    # Read data (works for standard HTML form submissions)
    name = request.form.get("name")
    email = request.form.get("email")
    subject = request.form.get("subject")
    message = request.form.get("message")

    # Env variables
    sender_email = os.getenv("GHACTION_POSTMAN")   # sender email
    sender_secret = os.getenv("GHACTION_MAIL")     # sender app secret
    receiver_email = os.getenv("GHACTION_HOME")    # receiver email

    # Basic safety check to ensure required values exist
    if not sender_email or not sender_secret or not receiver_email:
        return "Server configuration missing", 500

    # Construct email message
    msg = EmailMessage()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = f"Portfolio Contact: {subject}"

    msg.set_content(
        f"Name: {name}\n"
        f"Email: {email}\n\n"
        f"Message:\n{message}"
    )

    try:
        # Use Port 587 with starttls
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_secret)
            server.send_message(msg)
        return redirect("https://pareshmahya.github.io/profile/thankyou.html")
    except Exception as e:
        print(f"Error: {e}")
        return f"Error sending message", 500

if __name__ == "__main__":
    # Render uses the PORT environment variable
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)

#
