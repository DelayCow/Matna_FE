import { useNavigate } from "react-router-dom";
import type { RecipeReview } from "../services/data/RecipeData";

import "@/features/recipe/styles/reviewSection.css"

interface ReviewSectionProps{
    reviews: RecipeReview[];
    recipeNo: number;
    rating: number;
    reviewCount: number;
}

export default function ReviewSection({
    reviews,
    recipeNo,
    rating,
    reviewCount,
}: ReviewSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="bg-light p-3 rounded-3">
      {/* 헤더 */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold m-0">
          다른 회원의 후기
          <span className="text-warning ms-1">
            <i className="bi bi-star-fill"></i>{" "}
            <span>{rating.toFixed(1)}</span>
          </span>{" "}
          ({reviewCount})
        </h6>

        {reviews && reviews.length > 0 && (
          <button
            type="button"
            onClick={() => navigate(`/review/recipe/${recipeNo}`)}
            className="btn btn-link p-0 text-dark text-decoration-none fw-bold"
          >
            전체 보기 <i className="bi bi-chevron-right"></i>
          </button>
        )}
      </div>

      {/* 리뷰 내용 */}
      {(reviews && reviews.length > 0) ? (
        <div
          className="d-flex gap-2"
          style={{ overflow: "hidden" }}
        >
          {reviews.map((review) => (
            <img
              key={review.reviewNo}
              src={review.imageUrl}
              alt={`review${review.reviewNo}`}
              className="review-thumb"
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted py-4">
          <i className="bi bi-chat-square-text fs-1 d-block mb-2"></i>
          <p className="mb-0">아직 작성된 후기가 없습니다</p>
        </div>
      )}
    </section>
  );
}
