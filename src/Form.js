import React from 'react';

export default function Form( {values, submit, inputChange, checkboxChange, disabled, errors} ) {
    const onSubmit = event => {
        event.preventDefault();
        submit();
    }

    const onInputChange = event => {
        const { name, value } = event.target;
        inputChange( name, value );
    }

    const onCheckboxChange = event => {
        const { name, checked } = event.target;
        checkboxChange( name, checked );
      }


    return (
        <form onSubmit={ onSubmit }>
            <div>
                <button disabled={ disabled }>Submit</button>
                <div>
                    <div>{ errors.name }</div>
                    <div>{ errors.email }</div>
                    <div>{ errors.password }</div>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        value={ values.name }
                        onChange={ onInputChange }
                        name='name' 
                        type="text" 
                        id="name"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        value={ values.email }
                        onChange={ onInputChange }
                        name='email' 
                        type="email" 
                        id="email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        value={ values.password }
                        onChange={ onInputChange }
                        name='password'
                        type="password" 
                        id="password"
                    />
                </div>
                <div>
                    <label htmlFor="terms">Terms of Service: </label>
                    <input 
                        name="terms"
                        onChange={ onCheckboxChange }
                        type="checkbox" 
                        id="terms"
                        checked={ values.terms === true }
                    />
                </div>
            </div>
        </form>
    )
}