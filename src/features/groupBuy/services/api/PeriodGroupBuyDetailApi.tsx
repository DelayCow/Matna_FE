import AxiosInterceptor from "@/shared/services/AxiosInterceptor";
import {type PeriodGroupBuyDetailResponse,
        type JoinGroupBuyRequest,
        type StopGroupBuyRequest,
        type ApiResponse,
        type CurrentUser
} from "../data/PeriodGroupBuyData";

//현재 사용자 인증 정보 조회
export const getCurrentUser = async (): Promise<CurrentUser> => {
    const response = await AxiosInterceptor.get('/api/auth/currentUser', {
        withCredentials: true
    });
    return response.data;
};

//기간공구 상세 조회
export const getPeriodGroupBuyDetail = async (periodGroupBuyNo: number): Promise<PeriodGroupBuyDetailResponse> => {
    const response = await AxiosInterceptor.get(`/api/periodGroupBuy/detail/${periodGroupBuyNo}`);

    if (response.status === 404) {
        throw new Error('존재하지 않는 공동구매 정보입니다.');
    }
    
    return response.data;
};

//공동구매 참여하기
export const joinPeriodGroupBuy = async (request: JoinGroupBuyRequest): Promise<ApiResponse> => {
    const response = await AxiosInterceptor.post('/api/periodGroupBuy/join', request, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};


//공동구매 참여취소하기
export const cancelParticipation = async (groupBuyParticipantNo: number): Promise<ApiResponse> => {
    const response = await AxiosInterceptor.put(
        `/api/periodGroupBuy/cancelParticipant/${groupBuyParticipantNo}`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};

//개설자 중단하기
export const stopPeriodGroupBuy = async (groupBuyNo: number, request: StopGroupBuyRequest): Promise<ApiResponse> => {
    const response = await AxiosInterceptor.put(`/api/periodGroupBuy/cancelCreator/${groupBuyNo}`, request, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
}