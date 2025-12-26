import { useNavigate } from "react-router-dom";

import SearchBar from "@/shared/components/SearchBar";
import SortDropdown from "@/shared/components/SortDropDown";
import SpicyFilter from "@/shared/components/SpicyFilter";
import { RecipeCard } from "@/shared/components/RecipeCard";
import { RECIPE_SORT_OPTIONS } from "@/features/recipe/components/recipeSortOptions";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useRecipeHome } from "@/shared/hooks/useRecipeHome";


export default function RecipeHome() {
  const navigate = useNavigate();

  const {
    recipes,
    loading,
    setKeyword,
    setSpicyLevel,
    setSort,
  } = useRecipeHome();

  return (
    <>
      {/* 검색 */}
      <SearchBar
        type="recipe"
        onSearch={setKeyword}
      />

      {/* 매운맛 필터 */}
      <SpicyFilter
        levelChange={setSpicyLevel}
      />

      {/* 정렬 */}
      <SortDropdown
        options={RECIPE_SORT_OPTIONS}
        defaultValue="inDate"
        onChange={setSort}
      />

      {/* 레시피 카드 목록 */}
      <div className="container-fluid py-2">
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {recipes.map(recipe => (
            <div
              key={recipe.recipeNo}
              className="col d-flex justify-content-center"
            >
              <RecipeCard
                recipe={recipe}
                onClickDetail={() =>
                  navigate(`/recipe/detail/${recipe.recipeNo}`)
                }
              />
            </div>
          ))}
        </div>

        {/* 로딩 표시 */}
        {loading && (
          <div className="text-center py-3 text-muted">
            로딩 중...
          </div>
        )}
      </div>
    </>
  );
}
