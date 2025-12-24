import AxiosInterceptor from "../AxiosInterceptor";
import { 
    type PeriodGroupBuy, 
    type QuantityGroupBuy, 
    type GroupBuyParams 
} from "../data/GroupBuyHomeData";

// 기간공구 목록 조회
export const getPeriodGroupBuyList = async (params?: GroupBuyParams): Promise<PeriodGroupBuy[]> => {
    const queryParams = new URLSearchParams();
    
    if (params?.keyword && params.keyword.trim()) {
        queryParams.append('keyword', params.keyword);
    }
    if (params?.orderBy && params.orderBy !== 'recent') {
        queryParams.append('orderBy', params.orderBy);
    }

    const url = queryParams.toString() 
        ? `/api/periodGroupBuy/home?${queryParams.toString()}`
        : '/api/periodGroupBuy/home';

    const response = await AxiosInterceptor.get(url);
    return response.data;
};

// 수량공구 목록 조회
export const getQuantityGroupBuyList = async (params?: GroupBuyParams): Promise<QuantityGroupBuy[]> => {
    const queryParams = new URLSearchParams();

    if (params?.keyword && params.keyword.trim()) {
        queryParams.append('keyword', params.keyword);
    }
    if (params?.orderBy && params.orderBy !== 'recent') {
        queryParams.append('orderBy', params.orderBy);
    }

    const url = queryParams.toString() 
        ? `/api/quantityGroupBuy/home?${queryParams.toString()}`
        : '/api/quantityGroupBuy/home';

    const response = await AxiosInterceptor.get(url);
    return response.data;
};