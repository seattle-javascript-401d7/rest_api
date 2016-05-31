module.exports = function(app) {
  require('./dz_handle_error')(app);
  require('./dz_resource')(app);
  // require('./dz_communicate')(app);
};
