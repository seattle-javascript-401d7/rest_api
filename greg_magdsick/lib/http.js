module.exports = exports = function(req, res, next) {
  try {
    var authHeader = req.headers.authorization;
    var namePassword = authHeader.split(' ')[1];
    var namePassBuff = new Buffer(namePassword, 'base64');
    var namePassPT = namePassBuff.toString();
    namePassBuff.fill(0);
    var namePassArr = namePassPT.split(':');
    req.auth = {
      username: namePassArr[0],
      password: namePassArr[1]
    };
    if (namePassArr[0].length < 1 || namePassArr[1].length < 1) {
      throw new Error('no username or password');
    }
  } catch (e) {
    process.stdout.write(e + '\n');
    return res.status(400).json({ msg: 'bad request' });
  }
  next();
};
