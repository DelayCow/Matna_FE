import type { Ingredient } from "@/features/recipe/services/data/RecipeData";

import "@/features/recipe/styles/ingredientList.css";

interface IngredientListProps {
    ingredients: Ingredient[];
    reviewCount: number;
}

export default function IngredientList({
  ingredients,
  reviewCount,
}: IngredientListProps) {
  return (
    <section className="mb-5 px-3">
      {/* 제목 영역 */}
      <div className="d-flex justify-content-between align-items-end mb-2 border-bottom pb-1">
        <h5 className="fw-bold m-0">재료</h5>
        <small className="text-muted">
          후기 {reviewCount}건 통계입니다.
        </small>
      </div>

      {/* 컬럼 헤더 */}
      <div className="d-flex text-muted mb-2">
        <div className="col-6">원재료</div>
        <div className="col-6 ps-2">대체재료</div>
      </div>

      {/* 재료 목록 */}
      <div>
        {ingredients.map((ing) => (
          <div
            key={ing.ingredientNo}
            className="d-flex ingredient-row"
          >
            {/* 원재료 */}
            <div className="col-6 pe-2">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex flex-nowrap me-2">
                  <span className="fw-600 text-nowrap me-1">
                    {ing.ingredientName}
                  </span>
                  <span className="text-muted text-nowrap">
                    {ing.amount}
                    {ing.unit}
                  </span>
                </div>

                {/* 공구 뱃지 */}
                <span
                  className={`badge badge-gonggu ${
                    ing.isGroupBuying ? "active" : "inactive"
                  }`}
                >
                  {ing.isGroupBuying
                    ? "진행 중인 공구가 있어요!"
                    : "진행 중인 공구가 없어요"}
                </span>
              </div>
            </div>

            {/* 대체재료 */}
            <div className="col-6 ps-2 d-flex align-items-center">
              {ing.alternatives && ing.alternatives.length > 0 && (
                <>
                  <i className="bi bi-arrow-right me-2 text-muted" />
                  <div className="w-100">
                    {ing.alternatives.map((alt) => (
                      <div
                        key={alt.ingredientNo}
                        className="d-flex justify-content-between flex-wrap mb-1"
                      >
                        <div className="d-flex flex-nowrap me-2">
                          <span className="fw-600 text-nowrap me-1">
                            {alt.ingredientName}
                          </span>
                          <span className="text-muted text-nowrap">
                            {alt.amount}
                            {alt.unit}
                          </span>
                        </div>

                        <span
                          className={`badge badge-gonggu ${
                            alt.isGroupBuying ? "active" : "inactive"
                          }`}
                        >
                          {alt.isGroupBuying
                            ? "진행 중인 공구가 있어요!"
                            : "진행 중인 공구가 없어요"}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}