import AxiosInterceptor from "@/shared/services/AxiosInterceptor";
import type { RecipeResponse } from "../data/RecipeData";

const RecipeDetailApi = async function(recipeNo:string):Promise<RecipeResponse> {
    const response = await AxiosInterceptor.get(`/api/recipes/detail/${recipeNo}`);
    return response.data;
}

export default RecipeDetailApi;