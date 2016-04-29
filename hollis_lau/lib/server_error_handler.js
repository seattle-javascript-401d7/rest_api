module.exports = function (err, res, msg) {
  process.stderr.write(err + "\n");
  res.status(500).json({ msg });
};
