import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants.js'
import { myOrdersList } from '../actions/orderActions.js'

function ProfileScreen({ history }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch();
    const listMyOrders = useSelector(state => state.myOrdersList);
    const { loading: loadingOrders, error: errorOrders, orders } = listMyOrders;

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;


    useEffect(() => {
        if (!userInfo) {   /// בודקים אם ישר פרטים ביוזר אינפו, כלומר כאשר מישהו מתחבר פרטיו נשמרים ביוזר אינפו אם הוא לא הצליח להתחבר היוזר אינפו יהיה ריק 
            history.push('/login');
        } else {
            if (!user.name || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(myOrdersList());
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        }
        else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }


    }
    return (<Row>
        <Col md={3}>
            <h2>Update User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated Successfully</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='name'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' onChange={e => setName(e.target.value)} value={name}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' onChange={e => setEmail(e.target.value)} value={email}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} value={password}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type='password' placeholder='Enter Confirm Password' onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}></Form.Control>
                </Form.Group>
                <Button type="submit" variant='primary'>Update <i className='fas fa-edit'></i></Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID AT</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td> {order._id} </td>
                                <td> {order.createdAt.substring(0, 10)} </td>
                                <td> {order.totalPrice}$ </td>
                                <td> {order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>} </td>
                                <td> {order.isDelivered ? order.deliveredAt.substring(0, 10) : (<i className='fas fa-times' style={{ color: 'red' }}></i>)} </td>
                                <td><LinkContainer to={`/orders/${order._id}`}><Button variant='light'>Details</Button></LinkContainer></td>


                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>

    )
}

export default ProfileScreen


