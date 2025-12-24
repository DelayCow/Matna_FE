import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "@/shared/components/SearchBar";
import SortDropdown, { type SortOption } from "@/shared/components/SortDropDown";
import SpicyFilter from "@/shared/components/SpicyFilter";
import { RecipeCard } from "@/shared/components/RecipeCard";

import { fetchRecipes } from "@/shared/services/api/RecipeHomeApi";
import { type Recipe } from "@/shared/services/data/RecipeHomeData";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

/* =======================
   정렬 옵션
======================= */
const SORT_OPTIONS: SortOption[] = [
  { label: "최신순", value: "inDate" },
  { label: "후기많은순", value: "reviewCount" },
];

export default function RecipeHome() {
  const navigate = useNavigate();

  /* =======================
     상태
  ======================= */
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(0);
  const [spicyLevel, setSpicyLevel] = useState<number | null>(null);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("inDate");
  const [loading, setLoading] = useState(false);

  /* =======================
     레시피 조회
  ======================= */
  const loadRecipes = async (reset = true) => {
    if (loading) return;
    setLoading(true);

    const nextPage = reset ? 0 : page;

    if (reset) {
      setRecipes([]);
      setPage(0);
    }

    try {
      const data = await fetchRecipes({
        page: nextPage,
        sort,
        spicyLevel,
        keyword,
      });

      setRecipes(prev =>
        reset ? data.content : [...prev, ...data.content]
      );
      setPage(prev => prev + 1);
    } catch (e) {
      console.error("레시피 목록 조회 실패", e);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     필터 / 검색 / 정렬 변경 시
  ======================= */
  useEffect(() => {
    loadRecipes(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spicyLevel, keyword, sort]);

  /* =======================
     렌더링
  ======================= */
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
        options={SORT_OPTIONS}
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
                recipeNo={recipe.recipeNo}
                thumbnail={recipe.thumbnailUrl}
                title={recipe.title}
                nickname={recipe.writerNickname}
                profileImage={recipe.writerProfile}
                rating={recipe.averageRating}
                reviewCount={recipe.reviewCount}
                servings={recipe.servings}
                makeTime={recipe.prepTime}
                difficulty={recipe.difficulty}
                spicy={recipe.spicyLevel}
                onClickDetail={(recipeNo) =>
                  navigate(`/recipe/detail/${recipeNo}`)
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
