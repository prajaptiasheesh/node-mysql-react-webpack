import axiosInstance from "./axios.config";

export const login = async ({ email, password })=>{
    let _response = {} 
    try {
        const response = await axiosInstance.post(
            '/authenticate/login',
            {
                email, password
            },
        )
        _response = { ..._response, data: response.data, error: null }
        
    } catch (error) {
        _response = {
            ..._response,
            data: null,
            error: error.error.error
        }
    }

    return _response;
}
