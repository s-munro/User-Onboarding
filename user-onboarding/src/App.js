import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'
import * as yup from 'yup';
import schema from './FormSchema';
import axios from 'axios';
import User from './User.js'

{/* - [ ] Name
- [ ] Email
- [ ] Password
- [ ] Terms of Service (checkbox)
- [ ] A Submit button to send our form data to the server. */}


const initialFormValues = {
  first_name: '',
  email: '',
  last_name: '',
  terms: false
};

const initialFormErrors = {
  first_name: '',
  email: '',
  last_name: '',
}
const initialUsers = [];
const initialDisabled = true;

function App() {

  const [ users, setUsers ] = useState(initialUsers);
  const [ formValues, setFormValues ] = useState(initialFormValues);
  const [ formErrors, setFormErrors ] = useState(initialFormErrors);
  const [ disabled, setDisabled ] = useState(initialDisabled);

  const getUsers = () => {
    axios
    .get('https://reqres.in/api/users')
    .then((res) => {
      setUsers(res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const postNewUser = (newUser) => {
    axios
    .post('https://reqres.in/api/users', newUser)
    .then((res) => {
      setUsers([ res.data.data, ...users ]);
      setFormValues(initialFormValues);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const inputChange = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors,
        [name] : ''
      });
    })
    .catch((err) => {
      setFormErrors({
        ...formErrors,
        [name] : err.errors[0]
      });
    });

    setFormValues({
      ...formValues,
      [name] : value
    });

    }



  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      email: formValues.email.trim(),
      last_name: formValues.last_name.trim(),
      // terms : ''
      // WHAT ABOUT TERMS?
    };
    postNewUser(newUser);
  }


  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid)
    });
  }, [formValues] )



console.log('users',users);


  return (
    <div className="App">
 
      <Form 
      values={formValues}
      change={inputChange}
      submit={formSubmit}
      disabled={disabled}
      errors={formErrors}
      />
      {users.map((user) => {
        console.log(user);
        // debugger
        return (<User key={user} details={user} />);
      })}
    </div>
    
  );
}

export default App;
