#!/usr/bin/env python
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
import cgi

FORM = """<html><body>
<form method="post" action="/">
  <label>Name: <input type="text" name="name" required></label><br>
  <label>Email: <input type="email" name="email" required></label><br>
  <label>Message:<br>
    <textarea name="message" rows="4" cols="40" required></textarea>
  </label><br>
  <button type="submit">Submit</button>
</form>
</body></html>"""

class MainHandler(webapp.RequestHandler):
    def get(self):
        self.response.out.write(FORM)

    def post(self):
        e = cgi.escape
        name    = e(self.request.get('name'))
        email   = e(self.request.get('email'))
        message = e(self.request.get('message'))
        self.response.out.write("""<html><body>
            <h2>Received!</h2>
            <p><b>Name:</b> %s</p>
            <p><b>Email:</b> %s</p>
            <p><b>Message:</b> %s</p>
            <a href="/">Back</a>
        </body></html>""" % (name, email, message))

def main():
    application = webapp.WSGIApplication([('/', MainHandler)], debug=True)
    util.run_wsgi_app(application)

if __name__ == '__main__':
    main()