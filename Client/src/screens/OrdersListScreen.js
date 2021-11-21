import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrder } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
    const orderList = useSelector(state => state.orderList);
    const { error, loading, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrder())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])



    return (
        <>
            <h1>Orders List</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table striped bordered hover responsive className='table-sm'  >
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL PRICE</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? (
                                        order.paidAt.substring(0, 10)) : (<i style={{ color: 'red' }} className='fas fa-times'></i>)
                                    }</td>
                                    <td style={{ textAlign: 'center' }}>{order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)) : (<i style={{ color: 'red' }} className='fas fa-times'></i>)
                                    }</td>
                                    <td>
                                        <LinkContainer to={`/orders/${order._id}`}>
                                            <Button variant='light' className='btn-sm'>DETAILS <i className="fas fa-info-circle"></i></Button>
                                        </LinkContainer>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    )
}

export default OrderListScreen
