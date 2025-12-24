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
export interface GroupBuyParams {
    keyword?: string;
    orderBy?: string;
}