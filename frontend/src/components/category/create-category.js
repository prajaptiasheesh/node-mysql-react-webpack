import React, { useCallback, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createCategory } from '../../services/common.service';
import Modal from '../shared/modal';
import { Input } from '../shared/form';
import toast from 'react-hot-toast';

let CreateCategoryModal = ({ onClose }, ref)=>{

    let [isOpen, toggleModal] = useState(false);
    useImperativeHandle(ref, () => ({
        show: () => {
            toggleModal(true)
        },
        hide: ()=>{
            toggleModal(false)
        }
    }));

    const { 
        register,  
        handleSubmit, 
        formState: 
        { errors, isValid } 
    } = useForm({
                    // resolver: yupResolver(schema),
                    reValidateMode: 'onBlur',
                    mode: 'onChange',
                    defaultValues: {
                        name: '',
                        title: ''
                    }
    });

    const onSubmit = useCallback(async(data)=>{
        if(isValid){
            let { error } = await createCategory(data)
            if(!error){
                onClose()
                toggleModal(false)
                toast.success("Created successfully")
            }else{
                let msg = error[Object.keys(error)[0]]
                toast.error(msg)
            }
        }
    },[isValid])

    return <Modal isOpen={isOpen} onClose={()=>toggleModal(false)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <Input {...register("name", { required: true })} id="catName" label="Enter category name" labelClass='form-label' className="form-control" />
                </div>
                <div className="mb-3">
                    <Input {...register("title", { required: true })} id="catTitle" label="Enter category title" labelClass='form-label' className="form-control" />
                </div>
                <div className="row text-center pt-4">
                    <div className="col-md-12 text-center">
                        <button type="submit" className="btn btn-primary" data-disabled={!isValid ? 'on': 'off'}>Create</button>
                    </div>
                </div>
            </form>
    </Modal>
}

export default CreateCategoryModal = React.forwardRef(CreateCategoryModal);