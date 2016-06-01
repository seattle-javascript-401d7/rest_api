module.exports = function(app) {
  require('./total_error_handle.js')(app);
  require('./resource.js')(app);
  require('./partyPlan.js')(app);
};
