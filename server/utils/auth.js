const jwt = require('jsonwebtoken');
const { checkUserExist } = require('../controllers/user');

// Secret key for signing and verifying JWTs
const JWT_SECRET = 'supersecretkey';

const getLogin = async (ctx) => {
  const { username, password } = ctx.request.body;

  // Verify the username and password against the database
  const user = await checkUserExist(username);
  if (user && await bcrypt.compare(password, user.password)) {
    // User is authenticated, generate a JWT with their user ID
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    ctx.body = { token };
  } else {
    // User is not authenticated, return 401 Unauthorized
    ctx.status = 401;
    ctx.body = { message: 'Invalid username or password' };
  }
}

const auth = (ctx) => {
  const authHeader = ctx.request.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      // Verify the JWT and extract the user ID
      const decodedToken = jwt.verify(token, JWT_SECRET);

      if (decodedToken) return true;
      return false;
    } catch (err) {
      // JWT is invalid or there is an error in MongoDB
      ctx.status = 401;
      ctx.body = { message: err };
    }
  } else {
    // Authorization header is missing or not a bearer token
    ctx.status = 401;
    ctx.body = { message: 'Missing or invalid token' };
  }
}

module.exports = { getLogin, auth }