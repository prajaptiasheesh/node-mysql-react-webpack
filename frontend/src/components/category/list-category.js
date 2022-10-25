import React, { useLayoutEffect, useRef } from 'react';
import { useState } from 'react';
import { getCategories } from '../../services/common.service';
import Grid from '../shared/grid';
import CreateCategoryModal from './create-category';

const ListCategory = ()=>{

    let [categoryList, setList] = useState({
        rows: [],
        count: 0,
        page: 1,
        pageSize: 10
    })

    let catModalRef = useRef();

    let [currentProductRow, setCurrentRow] = useState(null);

    let columnConfigs = [
        {
            fieldKey: 'name',
            title: "Name",
            className: 'Category name'
        },
        {
            fieldKey: 'title',
            title: "Category title",
            className: ''
        },
    ]


    const fetchPage = async ()=>{
        let { data: list, error} = await getCategories();
        if(!error && list){
            setList((prev)=>({
                ...prev,
                rows: list
            }))
        }
    }
    useLayoutEffect(()=>{
        fetchPage();
    }, [])

    const handleCloseModal = ()=>{
        fetchPage()
    }

    const toggleModal = ()=>{
        catModalRef.current.show()
    }

    return <div>
        <div className='row justify-content-between'>
            <div className='col-md'>
                Home
            </div>
            <div className='col-md'>
                <button type='button' onClick={toggleModal} className='btn btn-primary'> Create a New</button>
            </div>
        </div>
        <div>
            <Grid
                rows={categoryList.rows}
                columnConfigs={columnConfigs}
                pagination={null}
            />
        </div>
        <CreateCategoryModal ref={catModalRef} onClose={handleCloseModal} />
    </div>
}

export default ListCategory;