import express from 'express'
import { getProductById, getProducts, deleteProduct, createProduct, getTopProducts, updateProduct, createProductReview } from '../controllers/productController.js'
import { protectFunc, adminCheck } from '../middleware/authMiddleware.js'
const router = express.Router()


///fetch all products
router.route('/').get(getProducts)
///create product
router.route('/').post(protectFunc, adminCheck, createProduct)
/// get top products
router.route('/top').get(getTopProducts);
///create review
router.route('/:id/reviews').post(protectFunc, createProductReview);
///fetch product by id
router.route('/:id').get(getProductById)
///update product
router.route('/:id').put(protectFunc, adminCheck, updateProduct)
/// delete product by id
router.route('/:id').delete(protectFunc, adminCheck, deleteProduct)


export default router;