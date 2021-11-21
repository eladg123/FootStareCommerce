import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate.js'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstatnts'

const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1;

    const productList = useSelector(state => state.productList);
    const { error, loading, products, page, pages } = productList;

    const productDelete = useSelector(state => state.productDelete)
    const { success: successDelete, loading: loadingDelete, error: errorDelete } = productDelete;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const createdProduct = useSelector((state) => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: productCreated } = createdProduct;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/product/${productCreated._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, productCreated, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler = () => {
        dispatch(createProduct());
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products List</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        Create Product <i className='fas fa-plus'></i>
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorCreate}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (<>
                    <Table striped bordered hover responsive className='table-sm'  >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>Image</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>EDIT / DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td><Image alt={product.name} src={product.image} style={{ height: '30px' }}></Image></td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}><i className='fas fa-trash'></i></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
                )}
        </>
    )
}

export default ProductListScreen