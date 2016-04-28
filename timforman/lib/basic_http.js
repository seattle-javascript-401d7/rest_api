module.exports = exports = function(req, res, next) {
  try {
    var authHeader = req.headers.authorization;
    var namePassword = authHeader.split(' ')[1];
    var namePassBuf = new Buffer(namePassword, 'base64');
    var namePassPT = namePassBuf.toString();
    namePassBuf.fill(0);
    var namePassArr = namePassPT.split(':');
    req.auth = {
      username: namePassArr[0],
      password: namePassArr[1]
    };
    if (req.auth.username.length < 1 || req.auth.password.length < 1) throw new Error('No user name or password');
  } catch (err) {
    console.log(err);
    return res.status(403).json({ msg: 'Not authenticated' });
  }
  next();
};
