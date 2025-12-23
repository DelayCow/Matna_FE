import AxiosInterceptor from "../../../shared/services/AxiosInterceptor";

interface LoginResponse {
        message: string;
        redirectUrl : string;
    }
    
const loginApi = async function(memberId : string, password : string):Promise<LoginResponse> {
    const response = await AxiosInterceptor.post('/api/auth/login', {
        memberId, password
    });
    return response.data;
}

export default loginApi;