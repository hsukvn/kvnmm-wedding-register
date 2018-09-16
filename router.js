const Authentication  = require('./controller/authentication');
const Attendee        = require('./controller/attendee');
const Tag             = require('./controller/tag');
const Table           = require('./controller/table');
const passport        = require('passport');
const passportService = require('./services/passport');
const express         = require('express');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.use('/', express.static(__dirname + '/public'));
  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', Authentication.signup);
  app.get('/api/attendee', requireAuth, Attendee.get);
  app.post('/api/attendee', Attendee.add);
  app.put('/api/attendee/:id', requireAuth, Attendee.update);
  app.delete('/api/attendee/:id', requireAuth, Attendee.remove);
  app.get('/api/tag', requireAuth, Tag.get);
  app.post('/api/tag', requireAuth, Tag.add);
  app.put('/api/tag/:id', requireAuth, Tag.update);
  app.delete('/api/tag/:id', requireAuth, Tag.remove);
  app.get('/api/table', requireAuth, Table.get);
  app.post('/api/table', requireAuth, Table.add);
  app.put('/api/table/:id', requireAuth, Table.update);
  app.delete('/api/table/:id', requireAuth, Table.remove);
}
