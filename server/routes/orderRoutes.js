import express from 'express'

const router = express.Router()

import { createOrder, getOrderById, updateOrderToDelivered, updateOrderToPaid, getMyOrders, getOrders } from '../controllers/orderController.js'
import { adminCheck, protectFunc } from '../middleware/authMiddleware.js'

router.route('/').get(protectFunc, adminCheck, getOrders)
router.route('/').post(protectFunc, createOrder);
router.route('/myorders').get(protectFunc, getMyOrders);
router.route('/:id').get(protectFunc, getOrderById);
router.route('/:id/pay').put(protectFunc, updateOrderToPaid);
router.route('/:id/deliver').put(protectFunc, adminCheck, updateOrderToDelivered);


export default router;