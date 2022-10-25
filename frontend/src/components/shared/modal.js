import React, { useEffect, useRef, useState } from 'react';
import SkyLight from 'react-skylight'

const Modal = ({ overlayClickClose = true, children, onClose, styles, isOpen, ...props })=>{

    let ref = useRef();
    useEffect(()=>{
        if(ref.current){
            if(isOpen){
                ref.current.show()
            }else{
                ref.current.hide()
            }
        }

    }, [isOpen])

    return <SkyLight 
                dialogStyles={styles} 
                hideOnOverlayClicked={overlayClickClose}
                afterClose={onClose}
                ref={ref}
                {...props}
            >
                {children}
            </SkyLight>
}

export default Modal;