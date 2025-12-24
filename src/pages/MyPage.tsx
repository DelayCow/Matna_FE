import { RecipeCard } from "../shared/components/RecipeCard";
import { ReviewCard } from "@/shared/components/ReviewCard";


export default function MyPage(){
   
    const dummyRecipe = {
    recipeNo: 101,
    title: "초간단 10분 컷! 돼지고기 김치찌개",
    thumbnail: "https://placehold.co/600x400/orange/white?text=Food", // 임시 이미지
    nickname: "자취요리왕",
    profileImage: undefined, // 임시 프로필
    rating: 4.8,
    reviewCount: 342,
    servings: 2,
    makeTime: 20,
    difficulty: "쉬움",
    spicy: 3
  };

  const dummyReview = {
    reviewNo: 501,
    reviewImage: "https://placehold.co/600x400/blue/white?text=Review",
    writerNickname: "맛나꿈나무",
    writerProfileImage: undefined, 
    title: "진짜 너무 맛있어요! 다음에 또 해먹을게요.",
    rating: 5,
    inDate: new Date() // 오늘 날짜
  };


   

  const handleCardClick = (id: number) => {
    alert(`${id}번 레시피를 클릭하셨습니다! 상세 페이지로 이동합니다.`);
    console.log("클릭된 레시피 번호:", id);
  };

  const handleReviewClick = (no: number) => {
    alert(`${no}번 리뷰 상세 페이지로 이동합니다.`);
  };

   return(
    <>
      {/* 부트스트랩 컨테이너로 감싸서 중앙 정렬 및 여백 주기 */}
      <div className="container mt-5">
        <h2>홈 화면입니다</h2>
        
        <div className="row">
          {/* 모바일에서는 꽉 차게(col-12), 태블릿 이상에서는 6칸(col-md-6) 차지 */}
          <div className="col-12 col-md-6 col-lg-4">
            
            {/* 4. 컴포넌트 사용하기 */}
            <RecipeCard
              recipeNo={dummyRecipe.recipeNo}
              thumbnail={dummyRecipe.thumbnail}
              title={dummyRecipe.title}
              nickname={dummyRecipe.nickname}
              profileImage={dummyRecipe.profileImage}
              rating={dummyRecipe.rating}
              reviewCount={dummyRecipe.reviewCount}
              servings={dummyRecipe.servings}
              makeTime={dummyRecipe.makeTime}
              difficulty={dummyRecipe.difficulty}
              spicy={dummyRecipe.spicy}
              onClickDetail={handleCardClick} // 함수 전달
            />
            </div>

            {/* --- 리뷰 카드 섹션 --- */}
        <div className="col-12 col-md-6 col-lg-4">
          <h5 className="mb-3">내가 쓴 리뷰</h5>
          <ReviewCard
            reviewNo={dummyReview.reviewNo}
            reviewImage={dummyReview.reviewImage}
            writerNickname={dummyReview.writerNickname}
            writerProfileImage={dummyReview.writerProfileImage}
            title={dummyReview.title}
            rating={dummyReview.rating}
            inDate={dummyReview.inDate}
            onClickDetail={handleReviewClick}
          />

          </div>
        </div>
      </div>
      </>
  );
}