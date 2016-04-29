module.exports = exports = function(req, res, next) {
  try {
    var authHeader = req.headers.authorization;
    var nameAndPassword = authHeader.split(' ')[1];
    var nameAndPasswordBuffer = new Buffer(nameAndPassword, 'base64');
    var nameAndPasswordString = nameAndPasswordBuffer.toString();
    // clear out Buffer
    nameAndPasswordBuffer.fill(0);
    var nameAndPasswordArray = nameAndPasswordString.split(':');
    req.auth = {
      username: nameAndPasswordArray[0],
      password: nameAndPasswordArray[1]
    };
    if (req.auth.username.length < 1) throw new Error('No username entered');
    if (req.auth.password.length < 1) throw new Error('No password entered');
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: 'No username or password entered' });
  }
  next();
};
