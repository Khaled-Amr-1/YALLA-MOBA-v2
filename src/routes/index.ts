import { Router } from 'express';
import userRoutes from '../modules/users/user.route';
import profileRoutes from '../modules/profiles/profile.route';
const router = Router();

router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);

export default router;
