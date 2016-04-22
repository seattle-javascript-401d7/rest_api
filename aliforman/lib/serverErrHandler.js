module.exports = function(err, res) {
  console.log(err);
  res.status(500).json({ msg: 'There is a problem with the server.' });
};
