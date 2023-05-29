const SECURE = require('../SECURE');
const jwt = require('jsonwebtoken');

const authMiddleware =  (ctx, next) => {
  const unrestrictedRoutes = ['/user/login'];
  const unrestrictedRoute = unrestrictedRoutes.findIndex(
    (route) => ctx.request.path === route
  );
  if (SECURE.PRODUCTION === 'false' | unrestrictedRoute !== -1) {
    return next();
  }
  
  if (!SECURE.JWT_SECRET) {
    ctx.status = 400;
    ctx.body = { message: 'ServerError' };
  }

  const authHeader = ctx.request.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    // Verify the JWT and extract the user ID
    try {
      const decodedToken = jwt.verify(token, SECURE.JWT_SECRET);
      ctx.decodedToken = decodedToken;
      return next();
    } catch (e) {
      ctx.status = 401;
      ctx.body = { message: e };
      return;
    }
  } else {
    // Authorization header is missing or not a bearer token
    ctx.status = 401;
    ctx.body = { message: 'Missing or invalid token' };
    return;
  }
}

module.exports =  { authMiddleware };