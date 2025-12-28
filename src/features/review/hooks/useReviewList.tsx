import { useEffect, useState } from "react";
import ReviewApi from "../services/api/ReviewApi";
import type { Review } from "../services/data/ReviewData";

export const useReviewList = (recipeNo:string) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    
    useEffect(()=>{
        if(recipeNo === "") return;
        const loadReviewList = async () => {
        try {
            const result = await ReviewApi(recipeNo);
            setReviews(result);
        } catch(e){
            console.error("리뷰 로드 실패", e)
        }};
        loadReviewList();
    },[recipeNo])

    return reviews;
};