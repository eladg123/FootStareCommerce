import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler';
import User from '../models/userModel.js'


const protectFunc = AsyncHandler(async (req, resp, next) => {
    let token;
    /// in this if we check if the authorization exist and if its starts with Bearer before we grab the token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]    /// מחלק את הסטרינג של הטוקן לשתי חלקים שהרווח ביניהם מפריד ולוקח את החלק השני שהוא הטוקן, החלק הראשון(0) הוא הברייר
            const decoded = jwt.verify(token, process.env.JWT_SECRET); /// הפונקציה וריפיי מחזירה את האיידי של המשתמש המאומת
            req.user = await User.findById(decoded.id).select('-password') // מוצא את המשתמש שרציתי ומקבל אותו חוץ מאת הסיסמא שלו בעזרת פונקציית הסלקט שהכנסנו בה מינוס פאסוורד כדי לא לקבל אותה כי היא מידע רגיש
            next();
        } catch (error) {
            console.error(error)
            resp.status(401)
            throw new Error('Not authorized, token failed')
        }
    }
    if (!token) {
        resp.status(401)
        throw new Error('Not authorized, no token!')
    }

})

const adminCheck = (req, resp, next) => {
    if (req.user && req.user.isAdmin) {  /// check if the current user is an admin
        next()                         /// if he is admin we continue
    } else {
        resp.status(401)                                 /// error of not authorized
        throw new Error('Not authorized as an admin')
    }
}


export { protectFunc, adminCheck }