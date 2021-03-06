import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline="true" className='inlineStyle'  >
            <Form.Control className='search mr-sm-2 ml-sm-5' type='text' placeholder='Search Products' name='q' onChange={e => setKeyword(e.target.value)}>
            </Form.Control>
            <button className='inlineStyle' type='submit' variant='outline-success' className='p-2'>Search <i className="fas fa-search"></i></button>

        </Form>
    )
}

export default SearchBox
