export interface Recipe {
  recipeNo: number;
  thumbnailUrl: string;
  title: string;
  writerNickname: string;
  writerProfile?: string;
   averageRating: number;
  reviewCount: number;
  servings: number;
  prepTime: number;
  difficulty: string;
  spicyLevel: number;
}

export interface RecipeResponse {
  content: Recipe[];
  last: boolean;
}
