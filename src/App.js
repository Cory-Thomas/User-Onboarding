import React, { useState, useEffect} from 'react';
import Form from './Form';
import axios from 'axios';
import * as yup from 'yup';
import formSchema from './validation/formSchema';

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
        return (
          <div key={user.id}>
            <img src={user.avatar !== "undefined" ? user.avatar : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F460844974364513647%2F&psig=AOvVaw1UI6t36EzFjcdude_dOyAU&ust=1597960576241000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODot5qhqOsCFQAAAAAdAAAAABAD"} alt={`avatar of ${user.first_name}`} />
            <p>Name: {user.first_name}  {user.last_name}</p>
            <p>Email: {user.email}</p>
          </div>
        )
      })}
    </div>
  );
};

export default App;
