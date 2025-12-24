import "@/shared/styles/card.css"
import { SpicyLevelFormat } from "../utils/SpicyLevelFormat";
import defaultProfile from "@/assets/user.png";


interface RecipeCardProps {
    recipeNo: number;
    thumbnail: string;
    title: string;
    nickname: string;
    profileImage?: string;
    rating: number;
    reviewCount: number;
    servings: number;
    makeTime: number;
    difficulty: string;
    spicy: number; // 매움 레벨 db = 숫자 => 매운맛 단계
    onClickDetail: (recipeNo: number) => void;
}



export const RecipeCard = ({
    recipeNo,
    thumbnail,
    title,
    nickname,
    profileImage,
    rating,
    reviewCount,
    servings,
    makeTime,
    difficulty,
    spicy,
    onClickDetail
}: RecipeCardProps) => {

    const displayProfile = profileImage || defaultProfile;

    const spicyText = SpicyLevelFormat(spicy);
    return (
        <div className = "card card-custom card-wide"
            onClick = {() => onClickDetail(recipeNo)}
            style = {{ cursor: 'pointer'}}>
                <img src = {thumbnail} className = "card-img-top" alt = {title} />


            <div className="card-body px-0 py-2">
                <div className = "d-flex align-items-center mb-1">
                    <img src = {displayProfile} className = "profile-img" alt="User" />

                    <div className="overflow-hidden w-100">
            <div className="d-flex overflow-hidden w-100">
              <small className="fw-bold text-nowrap">{nickname}</small>
              
              <p className="card-text text-truncate mb-0 ms-2">{title}</p>
            </div>
            
            <div className="small text-muted">
              <span className="text-warning">
               
                <i className="bi bi-star-fill"></i> {rating.toFixed(1)}
              </span>
              <span> | 후기 {reviewCount}</span>
            </div>
          </div>
        </div>

        <div className="small text-muted text-center">
          <span className="text-secondary me-3">
            <i className="bi bi-person"></i> {servings}인분
          </span>
          <span className="text-secondary me-3">
            <i className="bi bi-clock"></i> {makeTime}분
          </span>
          <span className="text-secondary me-3">
            <i className="bi bi-star"></i> {difficulty}
          </span>
          <span>
             
            <img src="/src/assets/spicy.png" className="spicy" alt="spicy" /> {spicyText}
          </span>
        </div>
      </div>
      
    </div>
  );
};