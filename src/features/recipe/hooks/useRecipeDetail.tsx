import { useEffect, useState } from "react";
import type { RecipeDetail, RecipeResponse } from "../services/data/RecipeData";
import RecipeDetailApi from "../services/api/RecipeDetailApi";


export const useRecipeDetail = (recipeNo:string) => {
    const [recipe, setRecipe] = useState<RecipeResponse>();
    
    useEffect(()=>{
        if(recipeNo === "") return;
        const loadReviewList = async () => {
        try {
            const result = await RecipeDetailApi(recipeNo);
            setRecipe(result);
        } catch(e){
            console.error("레시피 로드 실패", e)
        }};
        loadReviewList();
    },[recipeNo])

    return recipe;
};

interface UseRecipeDetailOwnerResult {
  recipe?: RecipeDetail;
  isOwner: boolean;
  loading: boolean;
}

export const useRecipeDetailOwner = (
  recipeNo: string
): UseRecipeDetailOwnerResult => {
  const [recipe, setRecipe] = useState<RecipeDetail>();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipeNo === "") return;

    const loadRecipeDetail = async () => {
      try {
        const result = await RecipeDetailApi(recipeNo);
        setRecipe(result.recipeDetail);
        setIsOwner(
          result.currentMemberNo === result.recipeDetail.writerNo
        );
      } catch (e) {
        console.error("레시피 상세 로드 실패", e);
      } finally {
        setLoading(false);
      }
    };

    loadRecipeDetail();
  }, [recipeNo]);

  return { recipe, isOwner, loading };
};