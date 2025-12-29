import AxiosInterceptor from "@/shared/services/AxiosInterceptor";


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
  },
 
  cancelParticipation: async (participantNo: number, type: "PERIOD" | "QUANTITY") => {
    // 타입에 따라 URL 분기 처리
    const url = type === "PERIOD" 
      ? `/api/periodGroupBuy/cancelParticipant/${participantNo}`
      : `/api/quantityGroupBuy/cancelParticipant/${participantNo}`;
    
    // PUT 메서드로 요청
    const response = await AxiosInterceptor.put(url);
    return response.data;
  },

  // 8. 나눔 수령 확정
  confirmShare: async (participantNo: number) => {
  
    const today = new Date().toISOString().split('T')[0];
    
    const response = await AxiosInterceptor.post('/api/mypage/groupbuy/shared', {
      groupParticipantNo: participantNo,
      receiveDate: `${today}T00:00:00` 
    });
    return response.data;
  },

  ReviewDetail: async (reviewNo: number) => {
    const response = await AxiosInterceptor.get(`/api/review/detail/{reviewNo}`);
    return response.data;
  },


  deleteReview: async (reviewNo: number) => {
    const response = await AxiosInterceptor.delete(`/api/reviews/${reviewNo}`);
    return response.data;
  }



};


export default MyPageApi;