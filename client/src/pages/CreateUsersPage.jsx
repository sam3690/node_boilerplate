import React from 'react'

const CreateUserspage = () => {
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',   
        designation: '',
        idGroup: ''
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post('/users', form)
            alert('User created successfully');
        } catch (error) {
            alert('Error creating user:', error.response?.data?.message || 'Unknown error');
        }
    }

  return (
    <div>
        <h1>Create User</h1>
        <form onSubmit="">
            {Object.keys(form).map(field => (
                <div key={field}>
                    <input 
                        name={field} s
                        value={form[field]} 
                        onChange=""
                        placeholder={field}
                    />
                </div>
            ))}
        </form>
    </div>
  )
}

export default CreateUserspage