// api/index.ts
import router from "../src/routes";
import app from "../src/app";
router.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to the API',
    });
  });
export default app
