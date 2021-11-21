import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUserByAdmin } from '../controllers/userController.js'
import { protectFunc, adminCheck } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/').get(protectFunc, adminCheck, getUsers)
router.post('/login', authUser);
router.route('/profile').get(protectFunc, getUserProfile);
router.route('/profile').put(protectFunc, updateUserProfile);
router.route('/:id').delete(protectFunc, adminCheck, deleteUser)
router.route('/:id').get(protectFunc, adminCheck, getUserById);
router.route('/:id').put(protectFunc, adminCheck, updateUserByAdmin);


export default router;
