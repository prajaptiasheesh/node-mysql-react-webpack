import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import Login from '../../components/login'
import { act } from 'react-dom/test-utils';

  
globalThis.IS_REACT_ACT_ENVIRONMENT = true

describe('testing login component', ()=>{
    it("testing form submission based on input text data", ()=>{
        let value = "test123"
        let { container } = render(<Login />);
        
        let input = container.querySelector('input[name=email]');

        act(()=>{
            fireEvent.change(input, { bubbles: true, target: { value: value } })
        })
        let submitBtn = container.querySelector('button[type=submit]');
        console.log("submitBtn.getAttribute('data-disabled')", submitBtn.getAttribute('data-disabled'));
        expect(submitBtn.getAttribute('data-disabled')).toBe('off');
        
        
        act(()=>{
            fireEvent.change(input, { bubbles: true, target: { value: '' } })
        })
        submitBtn = container.querySelector('button[type=submit]');
        expect(submitBtn.getAttribute('data-disabled')).toBe('on');
    })

})