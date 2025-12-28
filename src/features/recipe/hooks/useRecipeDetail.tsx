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

interface UseRecipeDetailOwnerResult {
  recipe?: RecipeResponse;
  isOwner: boolean;
  loading: boolean;
}

export const useRecipeDetailOwner = (
  recipeNo: string
): UseRecipeDetailOwnerResult => {
  const [recipe, setRecipe] = useState<RecipeResponse>();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipeNo === "") return;

    let isMounted = true;

    const loadRecipeDetail = async () => {
      try {
        const result = await RecipeDetailApi(recipeNo);

        if (!isMounted) return;

        setRecipe(result.recipeDetail);
        setIsOwner(
          result.currentMemberNo === result.recipeDetail.writerNo
        );
      } catch (e) {
        console.error("레시피 상세 로드 실패", e);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadRecipeDetail();

    return () => {
      isMounted = false;
    };
  }, [recipeNo]);

  return { recipe, isOwner, loading };
};