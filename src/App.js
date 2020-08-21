import React, { useState, useEffect} from 'react';
import Form from './Form';
import axios from 'axios';
import * as yup from 'yup';
import formSchema from './validation/formSchema';
import cat from "./cat.jpg";
import style from "styled-components";

const StyledDiv = style.div`
  width: 80%;
  margin: 0 auto;
  background-color: rgba(255,255,255,.6);
  border-radius: 30px;
  padding-bottom: 10%;
`;

const StyledSection = style.section`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  .container{
    width: 40%;
    margin: 2% auto;
    text-align: center;
    background-color: skyblue;
    border-radius: 25px;
    color: black;
    padding: 2%;
  }

  img{
    padding-bottom: 4%;
    border-radius: 20%;
  }

  p{
    width: 70%;
    margin: 0 auto;
  }
`

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
    <StyledDiv>
      <Form
        values={formValues}
        submit={submitForm}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        disabled={disabled}
        errors={formErrors}
      />
      <StyledSection>
      {users.map(user => {
        if ( user.terms === true){
          return (
            <div key={user.id} class="container">
            <img src= {cat} alt="avatar" width="130px" height="130px" />
            
            <p>Name: {user.name}  </p>
            <p>Email: {user.email}</p>
          </div>
          )
        }
        return (
          <div key={user.id} class="container">
            <img src= {user.avatar} alt="avatar"  />
            
            <p>Name: {user.first_name} {user.last_name} </p>
            <p>Email: {user.email}</p>
          </div>
        )
      })}
      </StyledSection>
    </StyledDiv>
  );
};

export default App;
