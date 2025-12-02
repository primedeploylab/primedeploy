import jwt from 'jsonwebtoken';
import ClientUser from '../models/ClientUser.js';

export const clientAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientUser = await ClientUser.findOne({ _id: decoded.userId, status: 'approved' });

    if (!clientUser) {
      return res.status(401).json({ error: 'Invalid authentication or account not approved' });
    }

    req.clientUser = clientUser;
    req.clientUserId = clientUser._id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid authentication token' });
  }
};

export default clientAuth;
