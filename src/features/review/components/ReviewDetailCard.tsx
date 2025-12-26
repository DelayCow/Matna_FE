import { useNavigate } from "react-router-dom";
import { useState } from "react";
import spicyIcon from "../../../assets/spicy.png";
import user from "../../../assets/user.png";
import "../styles/reviewDetailCard.css";
import { DateFormat } from "@/shared/services/data/DateFormat";
import { SpicyLevelFormat } from "@/shared/services/data/SpicyLevelFormat";
import type { Review } from "../services/data/ReviewData";

interface ReviewCardProps {
    review: Review;
    recipeNo: number | null;
    isList: boolean;
}

export default function ReviewDetailCard({ review, recipeNo, isList }:ReviewCardProps) {
    const navigate = useNavigate();
    const [isEditOpen, setIsEditOpen] = useState(false);

    const onRemove = (reviewNo: number) => {
        console.log(`${reviewNo}번 리뷰 삭제 로직 실행`);
    }

    return (
        <div className="review-card">
            {!isList && review.reviewImage && (
                <img src={review.reviewImage} alt="리뷰 이미지" className="review-detail-image"/>
            )}
            <div className="d-flex justify-content-between align-items-start">
                <div className="review-info">
                    <div 
                        className="d-flex flex-column align-items-center writer-profile" 
                        onClick={() => navigate(`/mypage/${review.writerNo}`)}
                    >
                        <img 
                            src={review.writerProfileImage || user} 
                            alt="프로필사진" 
                            className="review-avatar" 
                        />
                        <div className="review-author">{review.writerNickname}</div>
                    </div>

                    <div>
                        <div className="mb-2">{review.title}</div>
                        <div className="review-meta">
                            <span>
                                <span className="text-warning mx-1"><i className="bi bi-star-fill"></i></span> 
                                {review.rating}
                            </span>
                            <span>{DateFormat(review.inDate)}</span>
                            <span className="review-badge">
                                <img src={spicyIcon} alt="spicy" /> {SpicyLevelFormat(review.spicyLevel)}
                            </span>
                        </div>
                    </div>
                </div>

                {review.writer && (
                    <div className="position-relative review-edit-box-container">
                        <i 
                            className="bi bi-three-dots-vertical text-dark" 
                            onClick={() => setIsEditOpen(!isEditOpen)}
                        ></i>
                        
                        {isEditOpen && (
                            <div className="review-edit-box text-center bg-white show">
                                <div 
                                    className="mb-2" 
                                    onClick={() => navigate(`/review/edit/${review.reviewNo}/${recipeNo}`)}
                                >
                                    수정
                                </div>
                                <div 
                                    className="mt-2 text-danger" 
                                    onClick={() => onRemove(review.reviewNo)}
                                >
                                    삭제
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="review-content">{review.content}</div>

            {review.alternatives && review.alternatives.length > 0 && (
                <div className="review-alternative-ing">
                    <div className="alternative-ing-title">대체한 재료</div>
                    {review.alternatives.map((item, index) => (
                        <div key={index} className="alternative-ing-item">
                            <span className="alternative-ing-label">{item.originalIngredientName}</span>
                            <span className="mx-2">→</span>
                            <span className="alternative-ing-value">{item.alternativeIngredientName}</span>
                        </div>
                    ))}
                </div>
            )}

            {isList && review.reviewImage && (
                <img src={review.reviewImage} alt="리뷰 이미지" className="review-image" />
            )}
        </div>
    );
}