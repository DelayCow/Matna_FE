import AxiosInterceptor from "@/shared/services/AxiosInterceptor";
import type { Review } from "../data/ReviewData";
    
const ReviewApi = async function(recipeNo:string):Promise<Review[]> {
    const response = await AxiosInterceptor.get(`/api/reviews/recipe/${recipeNo}`);
    return response.data;
}

export default ReviewApi;