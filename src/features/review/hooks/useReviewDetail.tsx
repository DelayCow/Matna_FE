import { useEffect, useState } from "react";
import ReviewDetailApi from "../services/api/ReviewDetailApi";
import type { Review } from "../services/data/ReviewData";

export const useReviewDetail = (recipeNo:string) => {
    const [review, setReview] = useState<Review>();
    
    useEffect(()=>{
        if(recipeNo === "") return;
        let isMounted = true;
        const loadReviewList = async () => {
        try {
            const result = await ReviewDetailApi(recipeNo);
            if (isMounted) {
                setReview(result);
            }
        } catch(e){
            console.error("리뷰 로드 실패", e)
        }};
        loadReviewList();
        return()=>{
            isMounted = false;
        }
    },[recipeNo])

    return review;
};