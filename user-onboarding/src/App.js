import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'
import * as yup from 'yup';
import schema from './FormSchema';
import axios from 'axios';

{/* - [ ] Name
- [ ] Email
- [ ] Password
- [ ] Terms of Service (checkbox)
- [ ] A Submit button to send our form data to the server. */}


const initialFormValues = {
  username: '',
  email: '',
  password: '',
  terms: false
};

const initialFormErrors = {
  username: '',
  email: '',
  password: '',
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
    .get('http://localhost:3000/users')
    .then((res) => {
      setUsers(res.data);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const postNewUser = (newUser) => {
    axios
    .post('http:localhost:3000/users', newUser)
    .then((res) => {
      setUsers([ res.data, ...users ]);
      setFormValues(initialFormValues);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const formSubmit = () => {
    const newUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      // WHAT ABOUT TERMS?
    };
    postNewUser(newUser);
  }


  // useEffect(() => {
  //   getUsers();
  // }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(valid)
    });
  }, [formValues] )

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


  return (
    <div className="App">
 
      <Form />
    </div>
  );
}

export default App;
