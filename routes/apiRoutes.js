// routes/apiRoutes.js - SIMPLIFIED VERSION
import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { verify_user } from '../controllers/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js'; // The new factory
import { ROLES, PERMISSIONS } from '../models/User.js'; // Import PERMISSIONS

const router = Router();

/* ================================
   Public Authentication Routes
   ================================ */
router.post('/api/auth/signup', authController.signup_post);
router.post('/api/auth/login', authController.login_post);
router.post('/api/auth/logout', authController.logout_post);

/* ================================
   User Verification (Protected)
   ================================ */
router.get('/api/auth/verify', ...protectRoute.public(), verify_user);

/* ================================
   User Profile Routes
   ================================ */
// Any authenticated user can view their own profile
router.get('/api/user/profile', ...protectRoute.user(), (req, res) => {
  res.json({ 
    success: true, 
    user: {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
      department: req.user.teacherData?.department,
      profilePicture: req.user.profilePicture // ✅ ADD THIS
    }
  });
});

/* ================================
   Guest/Public Content Routes
   ================================ */
// Allow guests to view public content
router.get('/api/public/courses', ...protectRoute.public(), (req, res) => {
  const isGuest = req.user.role === ROLES.GUEST;
  res.json({ 
    success: true, 
    message: `Public courses for ${isGuest ? 'guest' : 'authenticated'} user`,
    userRole: req.user.role
  });
});

/* ================================
   Admin-Only Routes
   ================================ */
// Admin can manage all users
router.get('/api/admin/users', 
  ...protectRoute.admin(),
  authController.get_all_users
);

// Admin can update user roles
router.put('/api/admin/users/:userId/role', 
  ...protectRoute.withPermission('update items'),
  authController.update_user_role
);

/* ================================
   Health Check Route (Public)
   ================================ */
router.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    roles: Object.values(ROLES)
  });
});

/* ================================
   Role Testing Routes (Development)
   ================================ */
// Test route to see what role you have
router.get('/api/test/my-role', ...protectRoute.public(), (req, res) => {
  res.json({
    success: true,
    user: {
      name: `${req.user.firstName} ${req.user.lastName}`,
      role: req.user.role,
      isGuest: req.user.role === ROLES.GUEST,
      permissions: {
        canCreateCourses: req.user.hasPermission('add courses'),
        canManageUsers: req.user.hasPermission('update items'), // Or another admin-specific permission
        canEnrollInCourses: req.user.hasPermission('enroll in courses')
      }
    }
  });
});

// Test routes can also be updated for consistency
router.get('/api/test/user-only', ...protectRoute.user(), (req, res) => {
    res.json({ success: true, message: 'You have USER level access or higher!' });
});
router.get('/api/test/teacher-only', ...protectRoute.teacher(), (req, res) => {
    res.json({ success: true, message: 'You have TEACHER level access or higher!' });
});
router.get('/api/test/admin-only', ...protectRoute.admin(), (req, res) => {
    res.json({ success: true, message: 'You have ADMIN level access!' });
});


export default router;