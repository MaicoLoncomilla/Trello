const jwt = require('jsonwebtoken');
const { User} = require('../db')

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if(!token) return res.status(403).json({ message: 'No token provided'});

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.id;

    const user = await User.findOne({ where: { id: req.userId }})
    if(!user) return res.status(404).json({ message: "no user found" });

    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

module.exports = { authenticateToken }