import AxiosInterceptor from "@/shared/services/AxiosInterceptor";
import type { Review } from "../data/ReviewData";
    
const ReviewDetailApi = async function(reviewNo:string):Promise<Review> {
    const response = await AxiosInterceptor.get(`/api/reviews/${reviewNo}`);
    return response.data;
}

export default ReviewDetailApi;