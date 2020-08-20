import React from 'react';
import style from 'styled-components';

const StyledForm = style.form`
    width: 30%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 1%;

    div {
        margin: 2%;

        input{
            margin-top: 3%;
        }
    }

    button {
        width: 80px;
        padding: 5px;
        border-radius: 10%;
    }
`;

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
        <StyledForm onSubmit={ onSubmit }>
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
                    <label htmlFor="name">Name: </label><br />
                    <input
                        value={ values.name }
                        onChange={ onInputChange }
                        name='name' 
                        type="text" 
                        id="name"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label><br />
                    <input
                        value={ values.email }
                        onChange={ onInputChange }
                        name='email' 
                        type="email" 
                        id="email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label><br />
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
        </StyledForm>
    )
}