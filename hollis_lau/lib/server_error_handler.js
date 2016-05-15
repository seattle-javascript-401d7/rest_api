module.exports = function (err, res) {
  process.stderr.write(err + "\n");
  res.status(500).json({ msg: "Server error" });
};
