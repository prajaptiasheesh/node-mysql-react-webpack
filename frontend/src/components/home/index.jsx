import React, { useLayoutEffect } from 'react';
import { useState } from 'react';
import { getDropdownValues, getProducts } from '../../services/common.service';
import Grid from '../shared/grid';
import Select from 'react-select'
import Modal from '../shared/modal';
import { useRef } from 'react';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const Home = ()=>{

    let [products, setProducts] = useState({
        rows: [],
        count: 0,
        page: 1,
        pageSize: 10
    })

    let [assignModalOpen, toggleAssignModal] = useState(false);
    let [currentProductRow, setCurrentRow] = useState(null);
    let [dropdownOptions, setDropdownOptions] = useState({
        categories: []
    })

    let columnConfigs = [
        {
            fieldKey: 'title',
            title: "Product Title",
            className: ''
        },
        {
            fieldKey: 'description',
            title: "Product Description",
            className: ''
        },
        {
            fieldKey: 'createdAt',
            title: "Created At",
            className: ''
        },
        {
            title: "Assign to Category",
            render: (row)=>{
                return <button type='button' className='btn' onClick={()=>assignProduct(row)}>Assign Product</button>
            }
        },
    ]

    const assignProduct = (row)=>{
        console.log('row', row);
        setCurrentRow(row);
        toggleAssignModal(true);
    }
    const fetchDashboard = async ()=>{
        let { data: list, error} = await getProducts();
        let { data: catList, error: catError} = await getDropdownValues();
        setDropdownOptions((prev)=>({
            ...prev,
            categories: catList
        }))
        setProducts((prev)=>({
            ...prev,
            rows: list
        }))
    }
    useLayoutEffect(()=>{
        fetchDashboard();
    }, [])

    return <div>
        Home
        <div>
            <Select options={dropdownOptions.categories} />
        </div>
        <div>
            <Grid
                rows={products.rows}
                columnConfigs={columnConfigs}
                pagination={null}
            />
            <Modal isOpen={assignModalOpen} onClose={()=>{ toggleAssignModal(false) }}>
                <div className='container'>
                    <div className='row'>
                        <input defaultValue={currentProductRow?.title} readOnly={true} />
                    </div>
                    <div className='row'>
                        <Select options={dropdownOptions.categories} />
                    </div>
                </div>
            </Modal>
        </div>
    </div>
}

export default Home;