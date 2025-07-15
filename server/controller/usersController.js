const bcrypt = require('bcrypt');
const usersModel = require('../models/usersModels')

exports.listUsers = async(req,res) => {
    try {
        const users = await usersModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

exports.createUser = async (req,res) => {
    const { name, username, email, password, designation, idGroup } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await usersModel.createUsers({ 
            name, 
            username, 
            email, 
            password: hashedPassword, 
            designation, 
            idGroup, 
            createdBy: req.session?.user.email
        });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}