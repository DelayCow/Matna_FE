import IngredientList from "@/features/recipe/components/IngredientList";
import RecipeHeader from "@/features/recipe/components/RecipeHeader";
import ReviewSection from "@/features/recipe/components/ReviewSection";
import SpicyStats from "@/features/recipe/components/SpicyStats";
import StepList from "@/features/recipe/components/StepList";
import { useRecipeDetailOwner } from "@/features/recipe/hooks/useRecipeDetail";
import { useNavigate, useParams } from "react-router-dom";


export default function RecipeDetail(){
  const { recipeNo } = useParams<{ recipeNo: string }>();
  const navigate = useNavigate();
  const { recipe, isOwner, loading} = useRecipeDetailOwner(recipeNo!);

  if (loading) {
    return null;
  }

  if (!recipe) {
    return null;
  }
  return (
    <>
    <div className="mobile-container position-relative">
      <RecipeHeader
        recipe={recipe}
        isOwner={isOwner}
      />

      <IngredientList
        ingredients={recipe.ingredients}
        reviewCount={recipe.reviewCount}
      />

      <StepList
        steps={recipe.steps}
      />

      <SpicyStats
        percentages={recipe.spicyLevelPercentages}
        reviewCount={recipe.reviewCount}
      />

      <ReviewSection
        recipeNo={recipe.recipeNo}
        reviews={recipe.reviews}
        rating={recipe.rating}
        reviewCount={recipe.reviewCount}
      />

      <div className="add-review-btn-area">
        <button
          className="btn btn-primary w-100 fw-bold py-2 rounded-3"
          style={{ backgroundColor: "#3b82f6", border: "none" }}
          onClick={() => navigate(`/review/add/${recipe.recipeNo}`)}
        >
          레시피 후기 남기기
        </button>
      </div>
    </div>

    </>
  );
}