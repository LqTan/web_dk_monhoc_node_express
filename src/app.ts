import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import CourseCategoryRoutes from './routes/CourseCategoryRoutes';
import CourseRoutes from './routes/CourseRoutes';
import sequelize from './config/database';
import UserRoutes from './routes/UserRoutes';
import UserProfileRoutes from './routes/UserProfileRoutes';
import ClassRoutes from './routes/ClassRoutes';
import AuthRoutes from './routes/AuthRoutes';
import ClassRegistrationRoutes from './routes/ClassRegistrationRoutes';
import TuitionRoutes from './routes/TuitionRoutes';
import PaymentRoutes from './routes/PaymentRoutes';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/course-categories', CourseCategoryRoutes);
app.use('/api/courses', CourseRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/user-profiles', UserProfileRoutes);
app.use('/api/classes', ClassRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/class-registrations', ClassRegistrationRoutes);
app.use('/api/tuitions', TuitionRoutes);
app.use('/api/payments', PaymentRoutes);

const PORT = process.env.PORT || 3000;

// Sync database và khởi động server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
  });
});