import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'



///@desc Create new Order
/// POST /api/orders
///@access Private

const createOrder = asyncHandler(async (req, resp) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        resp.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({ orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, user: req.user._id })
        const createdOrder = await order.save();
        resp.status(201).json(createdOrder)
    }
})

///@desc Get order by ID    
/// GET /api/orders/:id
///@access Private

const getOrderById = asyncHandler(async (req, resp) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        resp.json(order)
    } else {
        resp.status(400)
        throw new Error('Order not found')
    }

})


///@desc UPDATE order to paid    
/// PUT /api/orders/:id/pay
///@access Private
const updateOrderToPaid = asyncHandler(async (req, resp) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {       /// all of this object came from paypal
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save();
        resp.json(updatedOrder);
    } else {
        resp.status(400)
        throw new Error('Order not found')
    }

})
///@desc UPDATE order to delivered    
/// PUT /api/orders/:id/deliver
///@access Private
const updateOrderToDelivered = asyncHandler(async (req, resp) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        resp.json(updatedOrder);
    } else {
        resp.status(400)
        throw new Error('Order not found')
    }
})


//@desc GET logged in user orders
//@route  GET /api/orders/myorders
//@access PRIVATE
const getMyOrders = asyncHandler(async (req, resp) => {
    const orders = await Order.find({ user: req.user._id })
    resp.json(orders)

})

//@desc GET all orders
//@route  GET /api/orders
//@access PRIVATE/ADMIN
const getOrders = asyncHandler(async (req, resp) => {
    const orders = await Order.find({}).populate('user', 'id name')
    resp.json(orders)

})
export { createOrder, getOrderById, updateOrderToDelivered, updateOrderToPaid, getMyOrders, getOrders }