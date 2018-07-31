const Authentication  = require('./controller/authentication');
const User            = require('./controller/user');
const Attendee        = require('./controller/attendee')
const passportService = require('./services/passport');
const passport        = require('passport');
const express         = require('express');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.use('/', express.static(__dirname + '/public'));
  app.get('/api/attendee', requireAuth, Attendee.get);
  app.post('/api/attendee', Attendee.add);
  app.put('/api/attendee/:id', requireAuth, Attendee.update);
  app.delete('/api/attendee/:id', requireAuth, Attendee.remove);
  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', Authentication.signup);
}
