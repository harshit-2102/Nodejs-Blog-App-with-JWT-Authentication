const { Router } = require('express');
const blogController = require('../controllers/blogController');
const { requireAuth } = require('../middleware/authMiddleware');


const router = Router();

router.get('/', blogController.get_Blogs);
router.get('/add-record', requireAuth, blogController.get_addRecord);
router.post('/add-category', requireAuth, blogController.post_addCategory);
router.post('/add-blog', requireAuth, blogController.post_addBlog);
router.get('/edit-blog/:blogId', requireAuth, blogController.get_editBlog);
router.post('/edit-blog', requireAuth, blogController.post_editBlog);
router.post('/delete-blog', requireAuth, blogController.delete_blog);

// router.get('/login', authController.login_get);
// router.post('/login', authController.login_post);
// router.get('/logout', authController.logout_get); 

module.exports = router;