import { Router } from 'express';
import userRoutes from '../modules/users/user.route';
import profileRoutes from '../modules/profiles/profile.route';
import postRoutes from "../modules/posts/post.route";
const router = Router();


router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);
router.use('/posts',postRoutes);
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
  });
});
export default router;
