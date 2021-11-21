import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'


dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();    /// delete all the oreders
        await Product.deleteMany();  /// delete all the products
        await User.deleteMany();     /// delete all the users

        const createdUsers = await User.insertMany(users);  /// insert all the users
        const adminUser = createdUsers[0]._id;         /// תופס את האיידי של האדמין על מנת להכניס אותו על כל מוצר, זאת אומרת כל מוצר צריך איידי של מי שהעלה אותו וכרגע האדמין העלה את כולם
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }              // על כל מוצר אני מכניס את המוצר עצמו עם האיידי של האדמין
        })
        await Product.insertMany(sampleProducts);
        console.log("Data imported".green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit();
    }

}

const destroyData = async () => {
    try {
        await Order.deleteMany();    /// delete all the oreders
        await Product.deleteMany();  /// delete all the products
        await User.deleteMany();     /// delete all the users

        console.log("Data destroyed".red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1);
    }

}


if (process.argv[2] === '-d') {        /// node seeder -d  תנאי זה אומר שאם רושמים בטרמינל 
    destroyData();                     /// אז זה מפעיל את הפונקציה שמוחקת את הדאטה
}
else {                                 /// אחרת זה מייבא את כל הדאטה כאשר נרשום כל פקודה אחרת כמו 
    importData();                      /// node seeder
}