module.exports = function(err, res) {
  console.log(err);
  res.status(500).json( { msg: 'Error you have. Fix it you must!' } );
};
