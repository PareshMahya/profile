#
#

import os
import smtplib
from flask import Flask, request, redirect
from email.message import EmailMessage

# Create Flask application instance
app = Flask(__name__)

# Root route for Render health checks
@app.route("/", methods=["GET", "HEAD"])
def home():
    return "Backend is running", 200

@app.route("/contact", methods=["POST"])
def contact():
    """
    This endpoint receives data from the website contact form.
    It sends the message as an email using values provided
    securely via environment variables.
    """
    
    print("POST /contact received")

    # Read form data sent from the browser
    name = request.form.get("name")
    email = request.form.get("email")
    subject = request.form.get("subject")
    message = request.form.get("message")

    # Read secrets from environment variables
    # These values are NOT stored in this repository
    sender_email = os.getenv("GHACTION_POSTMAN")   # sender email
    sender_secret = os.getenv("GHACTION_HOME")     # sender app secret
    receiver_email = os.getenv("GHACTION_MAIL")    # receiver email

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

    # Connect to Gmail SMTP using secure TLS
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_secret)
            server.send_message(msg)
        print("Email sent successfully")
    except Exception as e:
        print("Email failed:", e)
        return "Email send failed", 500
    
    # Redirect user back to thank you page on your website
    return redirect("https://pareshmahya.github.io/profile/thankyou.html")


# Optional health check endpoint for Render (safe to expose)
@app.route("/healthz")
def healthz():
    return "ok", 200

# Local development entry point
if __name__ == "__main__":
    port = int(os.getenv("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
    
#
