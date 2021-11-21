import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productsTopRatedReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducer.js'
import { orderCreateReducer, orderDetailsReducer, orderDeliverReducer, orderPayReducer, myOrdersListReducer, ordersListReducer } from './reducers/orderReducers.js'

const reducer = combineReducers({
    productList: productListReducer,                /// state of all the products
    productDetails: productDetailsReducer,          /// state of each product details
    cart: cartReducer,                              /// state of the cart items
    userLogin: userLoginReducer,                    /// state of the user Info
    userRegister: userRegisterReducer,              /// state of the register 
    userDetails: userDetailsReducer,                /// state of the current user details
    userUpdateProfile: userUpdateProfileReducer,    /// state of the profile
    orderCreate: orderCreateReducer,                /// state of the order
    orderDetails: orderDetailsReducer,              /// state of details order's
    orderPay: orderPayReducer,                      /// state of the pay
    myOrdersList: myOrdersListReducer,              /// state of my orders
    userList: userListReducer,                      /// state of all the usersList
    userDelete: userDeleteReducer,                  /// state of delete user
    userUpdated: userUpdateReducer,                 /// state of updated user
    productDelete: productDeleteReducer,            /// state of deleted product
    productCreate: productCreateReducer,            /// state of created product
    productUpdate: productUpdateReducer,            /// state of updated product
    orderList: ordersListReducer,                   /// state of all orders
    orderDeliver: orderDeliverReducer,              /// state if the order deliver
    productReviewCreate: productReviewCreateReducer,/// state of review created
    productTopRated: productsTopRatedReducer        /// state of top products
}) /// מחבר את כל הרדיוסרים שלי על מנת ליצור חנות
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod: {} },
    userLogin: { userInfo: userInfoFromStorage }
}  /// יוצר סטייט התחלתי שהוא ריק בהתחלה,חוץ מסטייט של העגלה שלי שאותו אני רוצה למלאות במה שהמשתמש שם על מנת שיהיה לי בלוקל סטוראג'
const middleware = [thunk]    /// יוצר את תוכנת הביניים שלי
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))  ///  בונה את החנות בעזרת פקודה מובנת שמקבלת את כל הרדיוסרים כרדיוסר אחיד ואת הסטייט ההתחלתי ואת הטאנק


export default store;