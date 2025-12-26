//기간 공동구매 상세 정보
export interface PeriodGroupBuyDetail{
    groupBuyNo: number;
    imageUrl: string;
    title: string;
    profileImageUrl?: string;
    nickname: string;
    creatorNo: number;
    itemSaleUrl?: string;
    price: number;
    feeRate: number;
    maxParticipants: number;
    dueDate: string;
    quantity: number;
    unit: string;
    content: string;
    shareLocation: string;
    shareDetailAddress?: string;
    buyEndDate: number;
    shareEndDate: number;
    shareTime: string;
}

//참여자
export interface PeriodParticipant {
    groupParticipantNo: number;
    participantNo: number;
    participatedDate: string;
    profileUrl?: string;
    nickname: string;
    memberNo: number;
}

//레시피
export interface PeriodRecipe {
    recipeNo: number;
    imageUrl?: string;
    title: string;
    authorNickname: string;
}

//API 응답
export interface PeriodGroupBuyDetailResponse {
    groupBuyDetail: PeriodGroupBuyDetail;
    participants: PeriodParticipant[];
    recipes: PeriodRecipe[];
}

// API 응답 공통
export interface ApiResponse {
    success: boolean;
    message: string;
}

//현재 사용자 정보
export interface CurrentUser {
    memberNo: number;
}

//현재 사용자 상태
export type UserStatus = 'normal' | 'participant' | 'creator';

//참여하기 요청
export interface JoinGroupBuyRequest {
    groupBuyNo: number;
}

//중단하기 요청
export interface StopGroupBuyRequest {
    cancelReason: string;
}