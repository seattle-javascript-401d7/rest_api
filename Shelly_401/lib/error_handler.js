module.exports = function(err, res){
  console.log(err);
  res.status(500).json({msg:'you have a server error'});
};
