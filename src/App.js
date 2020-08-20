import React, { useState, useEffect} from 'react';
import Form from './Form';
import axios from 'axios';
import * as yup from 'yup';
import formSchema from './validation/formSchema';
import cat from "./cat.jpg";

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
};

const intitialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: '',
};

const intitialDisabled = true;

function App() {

  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState( initialFormValues );
  const [formErrors, setFormErrors] = useState( intitialFormErrors );
  const [disabled, setDisabled] = useState( intitialDisabled );

  useEffect(() => {
    axios.get('https://reqres.in/api/users')
    .then( res => {
      setUsers( res.data.data )
      })
    .catch( error => {
      console.log( error, 'error' )
    })
  }, []);

  const postUsers = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then( res => {
        setUsers( [res.data, ...users] )
        setFormValues( initialFormValues )
      })
      .catch( error => {
        console.log( error, 'error' )
      })
  };

  const inputChange = ( name, value ) => {
    yup
      .reach( formSchema, name )
      .validate( value )
      .then( res => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch( error => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        })
      })
    setFormValues({
      ...formValues,
      [name]: value 
    });
  };

  const checkboxChange = ( name, isChecked ) => {
    yup
      .reach( formSchema, name )
      .validate( isChecked )
      .then( res => {
        setFormErrors({
          ...formErrors,
          [name]: true,
        })
      })
      .catch( error => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        })
      })
    setFormValues({
      ...formValues,
      [name]: isChecked 
    });
  };

  const submitForm = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      terms: formValues.terms
    };

    postUsers( newUser );
  };

  useEffect( () => {
    formSchema.isValid( formValues ).then( valid => {
      setDisabled( !valid )
    })
  }, [formValues])

console.log(users)
  return (
    <div>
      <Form
        values={formValues}
        submit={submitForm}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        disabled={disabled}
        errors={formErrors}
      />

      {users.map(user => {
        console.log(user)
        if ( user.terms === true){
          return (
            <div key={user.id}>
            <img src= {cat} alt="avatar" width="130px" height="130px" />
            
            <p>Name: {user.name}  </p>
            <p>Email: {user.email}</p>
          </div>
          )
        }
        return (
          <div key={user.id}>
            <img src= {user.avatar} alt="avatar"  />
            
            <p>Name: {user.first_name} {user.last_name} </p>
            <p>Email: {user.email}</p>
          </div>
        )
      })}
    </div>
  );
};

export default App;
