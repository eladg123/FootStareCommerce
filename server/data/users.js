import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John John Florence',
        email: 'florence@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Gabriel Medina',
        email: 'medina19@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users;