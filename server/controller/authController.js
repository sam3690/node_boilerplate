const bcrypt = require('bcryptjs')
const pool = require('../config/db');

exports.login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const result = await pool.request()
        .input('email', email)
        .query(`SELECT * FROM users_dash WHERE email = @email AND ISNULL(status, 1) = 1`);

        const user = result.recordset[0];
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }
        const match = await  bcrypt.compare(password, user.password)
        if(!match) return res.status(401).send('Invalid email or password');


        //Fetching all the permission at one for the user
        const PermissionResult = await pool.request()
        .input('idGroup', user.idGroup)
        .query(`SELECT 
                    p.pageUrl,
                    pg.CanView, 
                    pg.CanAdd, 
                    pg.CanEdit, 
                    pg.CanDelete, 
                    pg.CanViewAllDetail
                FROM pagegroup pg
                JOIN pages p ON pg.idPages = p.idPages
                WHERE pg.idGroup = @idGroup 
                    AND ISNULL(pg.isActive, 1) = 1 
                    AND ISNULL(p.isActive, 1) = 1`);

        const permissions = {}
        for( const row of PermissionResult.recordset) {
            const key = row.pageUrl.replace('/','').toLowerCase() || 'dashboard';
            permissions[key] = {
                CanView: row.CanView === true,
                CanAdd: row.CanAdd === true,
                CanEdit: row.CanEdit === true,
                CanDelete: row.CanDelete === true,
                CanViewAllDetail: row.CanViewAllDetail === true
            };
        }

        req.session.user = {
            id : user.id,
            name: user.name,
            username : user.username,
            email : user.email,
            idGroup : user.idGroup,
            permissions
        }

        res.send({message: 'Login successful', user: req.session.user});
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send({ message: 'Logout successful' });
    });
};

exports.getUser = (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).send('Unauthorized');
    }
    res.send({ user });
};