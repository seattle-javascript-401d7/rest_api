module.exports = function(app) {
  require('./cf_communication_service')(app);
  require('./cf_handle_error')(app);
  require('./cf_resource')(app);
};
