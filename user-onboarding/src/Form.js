import React from 'react'
import './App.css';

export default function UserForm(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse);
  };



  return (
<form className='form container' onSubmit={onSubmit}>
<div>
  <div>
    <div>{errors.first_name}</div>
    <div>{errors.email}</div>
    <div>{errors.last_name}</div>
  </div>
<h2>Add a User</h2>
<label className='label'>
  Name
  <input 
    name="first_name" 
    type="text" 
    value={values.first_name} 
    onChange={onChange}>
  </input>
</label>
<br />

<label className='label'>
  Email
  <input 
  name="email" 
  type="email"
  value={values.email}
  onChange={onChange}>
  </input>
</label>
<br />

<label className='label'>
  Password
  <input 
    name="last_name" 
    type="text" 
    value={values.last_name}
    onChange={onChange}>
  </input>
</label>
<br />

<label className='label'>
    I Have Read the Terms of Service
    <input name='terms' type="checkbox" checked={values.terms} onChange={onChange}>
    </input>
</label>
<br />
<button disabled={disabled}>Submit</button>
</div>
{/* - [ ] Name
- [ ] Email
- [ ] Password
- [ ] Terms of Service (checkbox)
- [ ] A Submit button to send our form data to the server. */}

</form>


  )
}