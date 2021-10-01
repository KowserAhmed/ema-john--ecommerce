import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loggedInUser ,setLoggedInUser]=useContext(UserContext)
  const onSubmit = data => console.log(data);

  console.log(loggedInUser); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
       <input  defaultValue={loggedInUser.email} {...register("email", { required: true })} />
      {errors.email && <span className="error">Email is required</span>}

      <input  defaultValue={loggedInUser.displayName} {...register("name", { required: true })} />
      {errors.name && <span className="error">Name is required</span>}

      <input placeholder="zilla,thana,post" {...register("address", { required: true })} />
      {errors.address && <span className="error">Address is required</span>}

      
      <input id="submit-btn" type="submit" />
    </form>
  );
};

export default Shipment;