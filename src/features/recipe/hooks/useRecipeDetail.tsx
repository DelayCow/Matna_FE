import { useEffect, useState } from "react";
import type { RecipeResponse } from "../services/data/RecipeData";
import RecipeDetailApi from "../services/api/RecipeDetailApi";


export const useRecipeDetail = (recipeNo:string) => {
    const [recipe, setRecipe] = useState<RecipeResponse>();
    
    useEffect(()=>{
        if(recipeNo === "") return;
        let isMounted = true;
        const loadReviewList = async () => {
        try {
            const result = await RecipeDetailApi(recipeNo);
            if (isMounted) {
                setRecipe(result);
            }
        } catch(e){
            console.error("레시피 로드 실패", e)
        }};
        loadReviewList();
        return()=>{
            isMounted = false;
        }
    },[recipeNo])

    return recipe;
};