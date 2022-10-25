import axiosInstance from "./axios.config";
export const getProducts = async ()=>{
    let _response = {} 
    try {
        const response = await axiosInstance.get('/products/get-by-filters',)
        _response = { ..._response, data: response.data, error: null }
        
    } catch (error) {
        _response = {
            ..._response,
            data: null,
            error: error.error
        }
    }

    return _response;
}

export const getDropdownValues = async ()=>{
    let _response = {} 
    try {
        const response = await axiosInstance.get('/users/get-dropdown-values',)
        _response = { ..._response, data: response.data, error: null }
        
    } catch (error) {
        _response = {
            ..._response,
            data: null,
            error: error.error
        }
    }

    return _response;
}

export const createCategory = async (data)=>{
    let _response = {} 
    try {
        const response = await axiosInstance.post('/category/create',data)
        _response = { ..._response, data: response.data, error: null }
        
    } catch (error) {
        _response = {
            ..._response,
            data: null,
            error: error.error
        }
    }

    return _response;
}

export const getCategories = async ()=>{
    let _response = {} 
    try {
        const response = await axiosInstance.get('/category/get-by-filters',)
        _response = { ..._response, data: response.data, error: null }
        
    } catch (error) {
        _response = {
            ..._response,
            data: null,
            error: error.error
        }
    }

    return _response;
}