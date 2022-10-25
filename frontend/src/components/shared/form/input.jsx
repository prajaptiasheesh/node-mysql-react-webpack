import React from "react";

const Input = React.forwardRef((props, ref)=>{

    const {  id, label, labelClass, ...rest } = props;
    return <React.Fragment>
            <label htmlFor={id} className={labelClass}>{label}</label>
            <input id={id} ref={ref} {...rest} />
        </React.Fragment>
            
})

export default Input