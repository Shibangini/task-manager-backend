const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Accept token from common locations: Authorization, x-access-token, query param
  if (req.headers.authorization) {
    // Authorization: Bearer <token> OR Authorization: <token>
    const parts = req.headers.authorization.split(" ");
    token = parts.length === 2 ? parts[1] : parts[0];
  }
  if (!token && req.headers['x-access-token']) token = req.headers['x-access-token'];
  if (!token && req.query && req.query.token) token = req.query.token;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId || decoded.id || decoded._id;
    if (!userId) return res.status(401).json({ message: 'Not authorized' });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(401).json({ message: 'Not authorized' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = protect;
