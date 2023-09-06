const jwt = require('jsonwebtoken');

const authorizeUser = (requiredPermission) => {
    return (req, res, next) => {
        try {
            // Extract the token from the Authorization header
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }

            // Verify and decode the token
            const decoded = jwt.verify(token, 'your_jwt_secret');
        
            // Check if the user has the required permission
            if (decoded.permissions && decoded.permissions.includes(requiredPermission)) {
                next();  // User is authorized, proceed to the next middleware or route handler
            } else {
                res.status(403).json({ message: 'Forbidden: You don\'t have the necessary permissions' });
            }
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};

module.exports = authorizeUser;