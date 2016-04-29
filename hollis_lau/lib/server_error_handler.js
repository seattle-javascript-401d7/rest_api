module.exports = function (err, res, msg) {
  if (err) {
    process.stderr.write(err + "\n");
  }
  res.status(500).json({ msg });
};
