const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// const { isAdmin } = require('../middlewares/authMiddleware');

router.get("/login", adminController.renderAdminLogin);
router.post("/login", adminController.handleAdminLogin);
router.get('/dashboard',  adminController.renderAdminPanel);
router.get("/logout", adminController.handleAdminLogout);
router.get("/users",  adminController.getAllUsers)
router.delete('/deleteUser/:id',  adminController.deleteUser);
router.put("/update-role",  adminController.updateUserRole)
module.exports = router;
