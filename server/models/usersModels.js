const pool = require('../config/db');

exports.getAllUsers = async () =>{
    const result = await pool.request().query(`
        SELECT id, name, username, email, designation, idGroup, status
        FROM users_dash
        WHERE ISNULL(status, 1) = 1
        `)
        return result.recordset;
}

exports.createUsers = async({name, username, email, hashedPassword, designation, idGroup, createdby}) => {
    const result = await pool.request()
        .input('name', name)
        .input('username', username)
        .input('email', email)
        .input('password', hashedPassword)
        .input('designation', designation)
        .input('idGroup', idGroup)
        .input('createdby', createdby)
        .query(`
            INSERT INTO users_dash (name, username, email, password, designation, idGroup, createdby, createdAt)
            VALUES (@name, @username, @email, @password, @designation, @idGroup, @createdby, GETDATE());
        `);
    return {id: result.recordset[0].id};
}