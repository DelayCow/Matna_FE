import AxiosInterceptor from "./AxiosInterceptor";

// 기간공구 응답 타입
export interface PeriodGroupBuy {
    periodGroupBuyNo: number;
    groupBuyImageUrl: string;
    title: string;
    creatorImageUrl?: string;
    nickname: string;
    dueDate: string;
    minPricePerPerson: number;
    maxPricePerPerson: number;
    participants: number;
    maxParticipants: number;
    shareLocation: string;
}

// 수량공구 응답 타입
export interface QuantityGroupBuy {
    quantityGroupBuyNo: number;
    groupBuyImageUrl: string;
    title: string;
    creatorImageUrl?: string;
    nickname: string;
    remainingQty: number;
    quantity: number;
    unit: string;
    pricePerUnit: number;
    shareAmount: number;
    shareLocation: string;
}

// API 파라미터 타입
interface GroupBuyParams {
    keyword?: string;
    orderBy?: string;
}

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