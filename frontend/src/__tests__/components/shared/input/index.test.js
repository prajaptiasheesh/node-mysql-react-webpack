import React, { useState } from 'react'
import { Simulate, act } from 'react-dom/test-utils'
import { createRoot } from 'react-dom/client'
import { fireEvent } from '@testing-library/react';
import Input from '../../../../components/shared/form/input'
globalThis.IS_REACT_ACT_ENVIRONMENT = true

let container, root;

let defaultOptions = {
    type: 'checkbox', 
    value: false, 
    className: null, 
    id: 'married', 
    name: 'married', 
    label: 'Married',
}
const TestInput = (options={})=>{
    let [boxValue, setBoxValue] = useState(false);

    const handleChange = (evt)=>{
        let { type, checked, value} = evt.currentTarget;
        value = type === "checkbox" ? checked: value;
        setBoxValue(value);
    }
    return <Input {...defaultOptions}  onChange={handleChange} {...options} checked={boxValue} />
}

beforeAll(()=>{
    container = document.createElement('div');
    root = createRoot(container);
})

afterAll(()=>{
    root.unmount();
    container.remove();
})

describe('input box testing', ()=>{
    it("testing input onchange event", async ()=>{
        let value = "test123"
        let onChange = jest.fn().mockImplementation(()=>{});

        let options = {
            type: 'text', 
            value: "", 
            onChange, 
            className: null, 
            id: 'name', 
            name: 'name', 
            label: 'Name'
        }
        act(()=>{
            root.render(<TestInput {...options} />);
        })

        let input = container.querySelector('input[type=text]');
        act(()=>{
            fireEvent.change(input, { target: { value: value } })
        })
        expect(onChange.mock.calls.length).toBe(1);
        
        act(()=>{
            fireEvent.change(input, { target: { value: "lora lupsum" } })
        })
        expect(onChange.mock.calls.length).toBe(2);
    })
    
    
    test("testing input checkbox checked/unchecked", ()=>{
        let options = {
            type: 'checkbox',
            checked: false, 
            value: "", 
            className: null, 
            id: 'indian', 
            name: 'indian', 
            label: 'isIndian'
        }
        act(()=>{
            root.render(<TestInput {...options}/>);
        })

        let input = container.querySelector('input[type=checkbox]');

        act(()=>{
            fireEvent.click(input)
        })        
        expect(input.checked).toEqual(true);
        
        act(()=>{
            fireEvent.click(input)
            fireEvent.click(input)
        })
        expect(input.checked).toEqual(true);
    })

})