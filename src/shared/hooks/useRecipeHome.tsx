import { useEffect, useState } from "react";
import { fetchRecipes } from "@/shared/services/api/RecipeHomeApi";
import { type Recipe } from "@/shared/services/data/RecipeHomeData";

export function useRecipeHome() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(0);
  const [spicyLevel, setSpicyLevel] = useState<number | null>(null);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("inDate");
  const [loading, setLoading] = useState(false);

  const loadRecipes = async (reset = true) => {
    if (loading) return;
    setLoading(true);

    const nextPage = reset ? 0 : page;

    if (reset) {
      setRecipes([]);
      setPage(0);
    }

    try {
      const data = await fetchRecipes({
        page: nextPage,
        sort,
        spicyLevel,
        keyword,
      });

      setRecipes(prev =>
        reset ? data.content : [...prev, ...data.content]
      );
      setPage(prev => prev + 1);
    } catch (e) {
      console.error("레시피 목록 조회 실패", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes(true);
    }, [spicyLevel, keyword, sort]);

  return {
    recipes,
    loading,
    setKeyword,
    setSpicyLevel,
    setSort,
    loadMore: () => loadRecipes(false),
  };
}
