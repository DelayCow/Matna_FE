import AxiosInterceptor from "@/shared/services/AxiosInterceptor";
import { useNavigate } from "react-router-dom";


const MyPageApi = {
  // 현재 로그인한 사용자 정보 가져오기
  fetchCurrentUser: async () => {
    const response = await AxiosInterceptor.get("/api/auth/currentUser");
    return response.data;
  },

  // 프로필 정보 가져오기
  fetchProfile: async (memberNo: number) => {
    const response = await AxiosInterceptor.get(`/api/mypage/${memberNo}/profile`);
    return response.data;
  },

  // 작성한 레시피 목록 가져오기
  fetchRecipes: async (memberNo: number) => {
    const response = await AxiosInterceptor.get(`/api/mypage/${memberNo}/recipe`);
    return response.data;
  },

  // 작성한 후기 목록 가져오기
  fetchReviews: async (memberNo: number) => {
    const response = await AxiosInterceptor.get(`/api/mypage/${memberNo}/reviewList`);
    return response.data;
  },

  // 공동구매 목록 가져오기 (host: 개설, participation: 참여)
  fetchGroupBuys: async (memberNo: number, typePath: "host" | "participation", filter: string) => {
    const response = await AxiosInterceptor.get(
      `/api/mypage/${memberNo}/groupBuy/${typePath}?filter=${filter}`
    );
    return response.data;
  },

   // 레시피 삭제 
  deleteRecipe: async (recipeNo: number) => {
   
    const response = await AxiosInterceptor.delete(`/api/mypage/${recipeNo}/recipe`);
    return response.data;
  }
  // editRecipe: async (recipeNo: number) => {
    
  //   window.location.
  //   window.location.useNavigate = `/api/recipe/edit/${recipeNo}`;
  // }
};


export default MyPageApi;