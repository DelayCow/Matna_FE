import AxiosInterceptor from "@/shared/services/AxiosInterceptor";
import { type RecipeResponse } from "@/shared/services/data/RecipeHomeData";

interface FetchRecipeParams {
  page: number;
  size?: number;
  sort: string;
  spicyLevel?: number | null;
  keyword?: string;
}

/**
 * 레시피 목록 조회 API
 */
export async function fetchRecipes({
  page,
  size = 20,
  sort,
  spicyLevel,
  keyword,
}: FetchRecipeParams): Promise<RecipeResponse> {

  const params: Record<string, string | number> = {
    page,
    size,
    sort: `${sort},desc`,
  };

  if (spicyLevel !== null && spicyLevel !== undefined) {
    params.spicyLevel = spicyLevel;
  }

  if (keyword && keyword.trim()) {
    params.keyword = keyword.trim();
  }

  const response = await AxiosInterceptor.get<RecipeResponse>(
    "/api/recipes",
    { params }
  );

  return response.data;
}

