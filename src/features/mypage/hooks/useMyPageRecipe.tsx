import { useState } from "react";
import MyPageApi from "@/features/mypage/services/api/MyPageApi";
import { type MyPageRecipe } from "@/features/mypage/components/MyPageRecipeCard";

export const useMyPageRecipe = () => {
    
    const [recipes, setRecipes] = useState<MyPageRecipe[]>([]);

    
    
    const handleDeleteRecipe = async (id: number) => {
      
       

        try {
            await MyPageApi.deleteRecipe(id); 
            setRecipes((prev) => prev.filter((r) => r.id !== id));
           
        } catch (e) {
            console.error("삭제 실패", e);
           
        }
    };

    
    return {
        recipes,
        setRecipes,
        handleDeleteRecipe
    };
};