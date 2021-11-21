import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Product from '../components/Product';
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import Paginate from '../components/Paginate.js'
import ProductCarousel from '../components/ProductCarousel.js'
import Meta from '../components/Meta'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])


    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            <h1>Latest Products</h1>
            <h3>Select Your Next Kit <i className="fas fa-fire"></i></h3>
            {loading ? (
                <Loader />)
                : error ? (
                    <Message variant='danger'>{error}</Message>)
                    : (<>
                        <Row> {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))} </Row>
                        <Paginate pages={pages} keyword={keyword ? keyword : ''} page={page} />
                    </>)}


        </>
    )
}

export default HomeScreen
