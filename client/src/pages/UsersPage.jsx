import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      api.get('/users')
        .then(res => {setUsers(res.data)})
        .catch(error => {console.error('Error fetching users:', error)})

    }, [])
    
    

  return (
    <div>
        <h1>Users</h1>
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    {user.name} {user.email} - {user.designation}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default UsersPage