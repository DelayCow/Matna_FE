
import AxiosInterceptor from "../AxiosInterceptor"


export const fetchMyReviewList = async (memberNo: number) => {

    const response = await AxiosInterceptor.get(`/api/mypage/${memberNo}/reviewList`);

    return response.data;
}