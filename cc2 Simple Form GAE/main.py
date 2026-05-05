#!/usr/bin/env python
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
import cgi

FORM = """
<html>
<head>
<title>Contact Form</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background: #f4f7fb;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
    }

    .container {
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        width: 400px;
    }

    h2 {
        text-align: center;
        color: #333;
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 12px;
        color: #444;
        font-weight: 500;
    }

    input, textarea {
        width: 100%;
        padding: 10px;
        margin-top: 6px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-sizing: border-box;
        font-size: 14px;
    }

    textarea {
        resize: vertical;
    }

    button {
        width: 100%;
        padding: 12px;
        background: #4f46e5;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 15px;
        cursor: pointer;
        transition: 0.3s;
    }

    button:hover {
        background: #4338ca;
    }

    .result {
        text-align: center;
    }

    .back-link {
        display: inline-block;
        margin-top: 15px;
        text-decoration: none;
        color: #4f46e5;
        font-weight: bold;
    }
</style>
</head>
<body>
<div class="container">
    <h2>Contact Form</h2>
    <form method="post" action="/">
      <label>Name:
        <input type="text" name="name" required>
      </label>

      <label>Email:
        <input type="email" name="email" required>
      </label>

      <label>Message:
        <textarea name="message" rows="4" required></textarea>
      </label>

      <button type="submit">Submit</button>
    </form>
</div>
</body>
</html>
"""

class MainHandler(webapp.RequestHandler):
    def get(self):
        self.response.out.write(FORM)

    def post(self):
        e = cgi.escape
        name    = e(self.request.get('name'))
        email   = e(self.request.get('email'))
        message = e(self.request.get('message'))

        self.response.out.write("""
        <html>
        <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f4f7fb;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }

            .container {
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                width: 400px;
                text-align: center;
            }

            .back-link {
                display: inline-block;
                margin-top: 15px;
                text-decoration: none;
                color: #4f46e5;
                font-weight: bold;
            }
        </style>
        </head>
        <body>
            <div class="container">
                <h2>Received!</h2>
                <p><b>Name:</b> %s</p>
                <p><b>Email:</b> %s</p>
                <p><b>Message:</b> %s</p>
                <a class="back-link" href="/">Back</a>
            </div>
        </body>
        </html>
        """ % (name, email, message))

def main():
    application = webapp.WSGIApplication([('/', MainHandler)], debug=True)
    util.run_wsgi_app(application)

if __name__ == '__main__':
    main()