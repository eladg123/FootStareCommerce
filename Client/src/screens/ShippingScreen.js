import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen({ history }) {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const { shippingAddress } = cart;
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Shipping <i className="fas fa-shipping-fast"></i></h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address:</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Your Address' value={address} onChange={e => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City:</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Your city' value={city} onChange={e => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code:</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Your Postal Code' value={postalCode} onChange={e => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country:</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Your Country' value={country} onChange={e => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>

        </FormContainer>
    )
}

export default ShippingScreen
