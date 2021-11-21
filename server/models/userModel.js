import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
}, { timestamps: true })

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.pre('save', async function (next) { /// פונקציה זו בשביל להצפין סיסמא של משתמש חדש לפני ששומרים אותה בדאטה בייס
    if (!this.isModified('password')) { /// simple check: if the current  user is not modified his password we dont need to encrypt his password again
        next()                          /// the next is continue the code without activate the rest of the function after this if!
    }                                     /// pre function  works before what we set in the first argument, here its the save, thats mean that before we save the password we encrypt her.
    const salt = await bcrypt.genSalt(10);     /// genSalt is a function that add salt to our password who need to encrypted. (10) Its a default value for rounds.
    this.password = await bcrypt.hash(this.password, salt);   /// the hash function needs two arguments for encrypt the password , the first the password , the second the salt.

})

const User = mongoose.model('User', userSchema);

export default User;