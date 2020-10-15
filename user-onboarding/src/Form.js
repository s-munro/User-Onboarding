import React from 'react'
import './App.css';

export default function UserForm(props) {



  return (
<form className='form container'>
<div>
<h2>Add a User</h2>
<label className='label'>
  Name
  <input name="username" type="text">
  </input>
</label>
<br />

<label className='label'>
  Email
  <input name="email" type="email">
  </input>
</label>
<br />

<label className='label'>
  Password
  <input name="password" type="text">
  </input>
</label>
<br />

<label className='label'>
    I Have Read the Terms of Service
    <input name='terms' type="checkbox">
    </input>
</label>
<br />
<button>Submit</button>
</div>
{/* - [ ] Name
- [ ] Email
- [ ] Password
- [ ] Terms of Service (checkbox)
- [ ] A Submit button to send our form data to the server. */}

</form>


  )
}