import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // Thay thế bằng secret key của bạn

interface JwtPayload {
  id: string;
  role: string;
}

export const authenticateJWT = (
  req: Request & { user?: JwtPayload }, 
  res: Response, 
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ' });
    return;
  }
};