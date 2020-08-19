import React from 'react';

export default function Form() {

    return (
        <form>
            <div>
                <label htmlFor="name">Name: </label>
                <input
                    value={values.name}
                    onChange={onInputChange}
                    name='name' 
                    type="text" 
                    id="name"
                />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input
                    value={values.email}
                    onChange={onInputChange}
                    name='email' 
                    type="email" 
                    id="email"
                />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input 
                    value={values.password}
                    onChange={onInputChange}
                    name='password'
                    type="password" 
                    id="password"
                />
            </div>
            <div>
                <label>Terms of Service: </label>
                <input 
                    type="check" 
                    
                />
            </div>
            <button>Submit</button>
        </form>
    )
}