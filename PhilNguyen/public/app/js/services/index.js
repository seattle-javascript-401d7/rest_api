module.exports = function(app) {
  require('./handle_error')(app);
  require('./resource')(app);
  require('./communication')(app);
};
