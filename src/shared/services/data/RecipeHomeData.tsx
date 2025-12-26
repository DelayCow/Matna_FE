export interface Recipe {
  recipeNo: number;
  title: string;
  thumbnailUrl: string;
  writerNickname: string;
  writerProfile?: string;
  reviewCount: number;
  averageRating: number;
  servings: number;
  prepTime: number;
  difficulty: string;
  spicyLevel: number;
}

export interface RecipeResponse {
  content: Recipe[];
  last: boolean;
}
