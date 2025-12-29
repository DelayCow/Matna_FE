import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type ReviewCardProps } from "@/shared/components/ReviewCard";

export const useMyPageReview = () => {
    const navigate = useNavigate();

    // 1. 상태 관리
    const [reviews, setReviews] = useState<ReviewCardProps[]>([]);

    // 2. 상세 페이지 이동 로직
    const handleReviewClick = (reviewNo: number) => {
        navigate(`/review/detail/${reviewNo}`);
    };

    // 3. 외부로 반환
    return {
        reviews,
        setReviews,
        handleReviewClick
    };
};