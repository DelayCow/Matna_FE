interface Alternative {
    originalIngredientName: string;
    alternativeIngredientName: string;
    amount: number;
    unit: string;
}

export interface Review {
    recipeNo: number | null;
    reviewNo: number;
    writerNo: number;
    writerNickname: string;
    writerProfileImage: string | null;
    title: string;
    content: string;
    reviewImage: string;
    rating: number;
    spicyLevel: number;
    inDate: string;
    alternatives: Alternative[];
    writer: boolean;
}