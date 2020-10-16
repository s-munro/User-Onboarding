import React from 'react'

function User(props) {
  if (!props.details) {
    return <h3>Fetching users' details...</h3>
  }
console.log('props', props);
console.log('propsdetails', props.details);
return (

  <div>
    <h2>{props.details.first_name}</h2>
    <p>Email: {props.details.email}</p>
    <p>{props.details.last_name}</p>
 </div>
)
}
export default User