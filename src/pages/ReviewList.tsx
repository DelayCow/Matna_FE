import { useNavigate, useParams } from "react-router-dom"
import "../features/review/styles/reviewList.css"
import ReviewDetailCard from "@/features/review/components/ReviewDetailCard";
import { useReviewList } from "@/features/review/hooks/useReviewList";
import { useRecipeDetail } from "@/features/recipe/hooks/useRecipeDetail";

export default function ReviewList(){
    const { recipeNo } = useParams();
    const navigate = useNavigate();
    const reviews = useReviewList(recipeNo || "");
    const recipe = useRecipeDetail(recipeNo || "");

    return(<>
        <div className="rating-summary">
            <span className="text-warning"><i className="bi bi-star-fill"></i></span>
            <span className="fw-semibold">{recipe?.recipeDetail.rating.toFixed(1)}</span>
            <span>({recipe?.recipeDetail.reviewCount})</span>
            <button className="write-review-btn" onClick={() => navigate(`/review/add/${recipeNo}`)}>
                <i className="bi bi-pencil"></i> 후기 작성하기
            </button>
        </div>
        <div>
            {reviews.map(r => <ReviewDetailCard key={r.reviewNo} review={r} recipeNo={recipeNo} isList={true}/>)}
        </div>
    </>)
}