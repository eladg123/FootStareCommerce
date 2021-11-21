import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen({ location, history }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null)
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;


    useEffect(() => {
        if (userInfo) {   /// בודקים אם ישר פרטים ביוזר אינפו, כלומר כאשר מישהו מתחבר פרטיו נשמרים ביוזר אינפו אם הוא לא הצליח להתחבר היוזר אינפו יהיה ריק 
            history.push(redirect);
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        }
        else {
            dispatch(register(name, email, password));
        }


    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                <Button type="submit" variant='primary'>Register <i className='fas fa-user-plus'></i></Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen

