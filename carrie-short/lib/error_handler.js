module.exports = function(err, res) {
  console.log(err);
  return res.status(500).json({
    msg: 'there was an error while trying to retrieve data'
  });
};
