import { useParams } from "react-router-dom"
import "../features/review/styles/reviewList.css"
import ReviewDetailCard from "@/features/review/components/ReviewDetailCard";
import { useReviewDetail } from "@/features/review/hooks/useReviewDetail";

export default function ReviewDetail(){
    const { reviewNo } = useParams();
    const review = useReviewDetail(reviewNo || "");

    if (!review) {
        return <div className="col-12 text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>;
    }

    return(<>
        <ReviewDetailCard key={reviewNo} review={review} recipeNo={review.recipeNo} isList={false}/>
    </>)
}