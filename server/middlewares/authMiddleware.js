import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

export const authCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, Login again'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.company = await Company.findById(decoded.id).select('-password');
    
    if (!req.company) {
      return res.status(401).json({
        success: false,
        message: 'Company not found'
      });
    }

    next(); 
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token or token expired'
    });
  }
};
