import { Router } from 'express';
import userRoutes from '../modules/users/user.route';
import profileRoutes from '../modules/profiles/profile.route';
import postRoutes from "../modules/posts/post.route";

const router = Router();

router.use('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
  });
});
router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);
router.use('/posts',postRoutes);

export default router;
