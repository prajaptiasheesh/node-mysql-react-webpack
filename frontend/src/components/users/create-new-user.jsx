import React, { useCallback } from "react";
import { Input } from '../shared/form'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    email: yup.string().required('Email is required').email('Please enter a valid email'),
    firstName: yup.string().required('First is required'),
    lastName: yup.string().optional(),
    mobileNo: yup.string().required('Mobile no. is required'),
    address: yup.string().required('Address is required'),
    gender: yup.string().oneOf(['male', 'female']).required('Gender is required'),
  }).required();

const CreateNewUser =  ()=>{

    const { register,  handleSubmit, formState:{ errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onBlur',
        mode: 'onChange',
        defaultValues: {}
      });
    let navigate = useNavigate();

    const onSubmitValid = useCallback((data)=>{
        if(isValid){
            localStorage.setItem('user', JSON.stringify(data));
            navigate("/users", { replace: false });
        }
    },[isValid])

    const onSubmitError = (err)=>{
        console.log(err)
    }
    const ErrorMessage = ({fieldName})=>{
        let msg = null;
        if(errors && errors[fieldName] && errors[fieldName]['message']){
            msg = <span className="text-danger"> {errors[fieldName]['message']} </span>;
        }else{
            msg = <span></span>;
        }
        return msg 
    }

    return <div className="user-add-form">
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitError)}>
            <div className="row">
                <div className="col">
                    <Input {...register("firstName", { required: true })} id="firstName" label="Enter your first name" labelClass='form-label' className="form-control" />
                    <ErrorMessage fieldName="firstName"/>
                </div>
                <div className="col">
                    <Input {...register("lastName", { required: true })} id="lastName" labelClass='form-label' className="form-control" label="Enter your last name" />
                    <ErrorMessage fieldName="lastName"/>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <Input {...register("email", { required: true })} id="email" labelClass='form-label' className="form-control" label="Enter your email" />
                    <ErrorMessage fieldName="email"/>
                </div>
                <div className="col">
                    <Input {...register("mobileNo", { required: true })} id="mobileNo" labelClass='form-label' className="form-control" label="Enter your mobile no" />
                    <ErrorMessage fieldName="mobileNo"/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Input {...register("address", { required: true })} id="address" labelClass='form-label' className="form-control" label="Enter your address" />
                    <ErrorMessage fieldName="address"/>
                </div>
                <div className="col">
                    <label htmlFor="gender" className="form-label d-block">Select a gender</label>
                    <select {...register("gender", { required: true })}>
                        <option value={null}></option>
                        <option value={'male'}>Male</option>
                        <option value={'female'}>Female</option>
                    </select>
                    <ErrorMessage fieldName="gender"/>
                </div>
            </div>
            <div className="row text-center pt-4">
                <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-primary" data-disabled={!isValid ? 'on': 'off'}>Submit</button>
                </div>
            </div>
        </form>
    </div>
}

export default CreateNewUser;