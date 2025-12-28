import { getDifficultyText } from "@/shared/services/data/DifficultyText";
import { SpicyLevelFormat } from "@/shared/services/data/SpicyLevelFormat";
import type { RecipeDetail } from "../services/data/RecipeData";

import "@/features/recipe/styles/recipeHeader.css";
import { useNavigate } from "react-router-dom";

interface RecipeHeaderProps {
  recipe: RecipeDetail;
  isOwner: boolean;
}

export default function RecipeHeader({
  recipe,
  isOwner,
}: RecipeHeaderProps) {
  const navigate = useNavigate();
  return (
  <>
    <div className="w-100">
      <img
        id="recipe-thumbnail"
        src={recipe.thumbnailUrl}
        className="img-fluid w-100"
        style={{ maxHeight: 250, objectFit: "cover" }}
      />
    </div>

    <main className="px-3 py-4">
      <section className="mb-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center">
            {/* 작성자 */}
            <div
              id="writer-profile"
              className="d-flex flex-column align-items-center me-2"
              data-no={recipe.writerNo}
            >
              <img
                id="writer-profile-img"
                src={recipe.writerProfile ?? "/img/user.png"}
                className="profile-img-lg me-2"
                alt="Profile"
                onClick={() =>
                  navigate(`/mypage/${recipe.writerNo}`)
                }
              />
              <small id="writer-nickname" className="mt-1">
                {recipe.writerNickname}
              </small>
            </div>

            <div>
              <div className="d-flex align-items-center gap-2">
                <h4 id="recipe-title" className="fw-bold mb-2">
                  {recipe.title}
                </h4>

                <div className="d-flex align-items-center text-muted mb-3">
                  <span className="me-2 text-black">
                    ⭐ <span id="recipe-rating">{recipe.rating.toFixed(1)}</span>
                  </span>
                  <span className="me-2">
                    💬 <span id="recipe-review-count">{recipe.reviewCount}</span>
                  </span>
                </div>
              </div>

              <p id="recipe-summary" className="mb-2">
                {recipe.summary}
              </p>

              <small className="text-muted">
                작성일자: <span id="recipe-inDate">{recipe.inDate}</span>
              </small>
            </div>
          </div>

          {isOwner && (
            <div id="edit-box" className="position-relative">
              <a href={`/recipe/edit/${recipe.recipeNo}`}>수정</a>
              {" · "}
              <a href={`/recipe/delete/${recipe.recipeNo}`}>삭제</a>
            </div>
          )}
        </div>

        <div
          id="summary-info"
          className="d-flex justify-content-between border-top border-bottom py-3 text-center text-secondary"
        >
          <div className="flex-fill border-end"><i className="bi bi-person fs-5 d-block mb-1"></i> <span>{recipe.servings}</span>인분</div>
          <div className="flex-fill border-end"><i className="bi bi-clock fs-5 d-block mb-1"></i> <span>{recipe.prepTime}</span>분이내</div>
          <div className="flex-fill border-end"><i className="bi bi-star fs-5 d-block mb-1"></i> <span>{getDifficultyText(recipe.difficulty)}</span></div>
          <div className="flex-fill"><img src="../assets/spicy.png" className="mx-auto d-block mt-1 mb-2"/><span>{SpicyLevelFormat(recipe.spicyLevel)}</span></div>
        </div>
      </section>
    </main>
  </>
  );
}