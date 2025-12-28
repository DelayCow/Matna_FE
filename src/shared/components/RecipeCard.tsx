import "@/shared/styles/card.css"

import { SpicyLevelFormat } from "@/shared/services/data/SpicyLevelFormat";

import defaultProfile from "@/assets/user.png";

import type { Recipe } from "../services/data/RecipeHomeData";

import { DifficultyFormat } from "../services/data/DifficultyFormat";


export interface RecipeCardProps {
    recipe : Recipe;
    onClickDetail?: () => void;

}

export const RecipeCard = ({
    recipe,
    onClickDetail,
}: RecipeCardProps) => {

  
  if (!recipe) return null;

  const {
    thumbnailUrl,
    title,
    writerNickname,
    writerProfile,
    averageRating,
    reviewCount = 0,
    servings,
    prepTime,
    difficulty,
    spicyLevel,
  } = recipe;

    const displayProfile = writerProfile || defaultProfile;




    return (
        <div className = "card card-custom card-wide"
            onClick = {onClickDetail}
            style = {{ cursor: 'pointer'}}>
                <img src = {thumbnailUrl} className = "card-img-top" alt = {title}
                onError={(e) => { (e.target as HTMLImageElement).src = "/img/default_recipe.jpg" }}
                 />


            <div className="card-body px-0 py-2">
                <div className = "d-flex align-items-center mb-1">
                    <img src = {displayProfile} className = "profile-img" alt="User" />

                    <div className="overflow-hidden w-100">
            <div className="d-flex overflow-hidden w-100">
              <small className="fw-bold text-nowrap">{writerNickname}</small>
              
              <p className="card-text text-truncate mb-0 ms-2">{title}</p>
            </div>
            
            <div className="small text-muted">
              <span className="text-warning">
               

                <i className="bi bi-star-fill"></i> 
                
                {typeof averageRating === 'number' ? averageRating.toFixed(1) : "0.0"}

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
            <i className="bi bi-clock"></i> {prepTime}분
          </span>
          <span className="text-secondary me-3">

            <i className="bi bi-star"></i> {DifficultyFormat(difficulty)}

          </span>
          <span>
             
            <img src="/src/assets/spicy.png" className="spicy" alt="spicy" /> {SpicyLevelFormat(spicyLevel)}
          </span>
        </div>
      </div>
      
    </div>
  );
};