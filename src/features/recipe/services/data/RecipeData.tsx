export interface IngredientAlternative {
    ingredientNo: number | null;
    ingredientName: string;
    unit: string;
    amount: number;
    isGroupBuying: boolean;
}

export interface Ingredient {
    ingredientName: string;
    amount: number;
    unit: string;
    isGroupBuying: boolean;
    alternatives: IngredientAlternative[];
}

export interface RecipeStep {
    stepOrder: number;
    content: string;
    imageUrl: string;
}

export interface RecipeReview {
    reviewNo: number;
    title: string | null;
    imageUrl: string;
    rating: number | null;
    inDate: string | null;
    spicyLevel: number | null;
}

export interface SpicyLevelPercentages {
    [key: string]: number;
}

export interface RecipeDetail {
    recipeNo: number;
    title: string;
    summary: string;
    thumbnailUrl: string;
    category: string;
    rating: number;
    reviewCount: number;
    servings: number;
    prepTime: number;
    difficulty: string;
    spicyLevel: number;
    inDate: string;
    writerNo: number;
    writerNickname: string;
    writerProfile: string;
    ingredients: Ingredient[];
    steps: RecipeStep[];
    reviews: RecipeReview[];
    spicyLevelPercentages: SpicyLevelPercentages;
}

export interface RecipeResponse {
    currentMemberNo: number;
    recipeDetail: RecipeDetail;
}