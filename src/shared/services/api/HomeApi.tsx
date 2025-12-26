
import QuantityGroupBuyCard from "@/shared/components/QuantityGroupBuyCard";
import AxiosInterceptor from "@/shared/services/AxiosInterceptor"; 

export const fetchHomeData = async () => {
    


    const [recipeRes,  reviewRes, qtyRes, prdRes] = await Promise.all([
        AxiosInterceptor.get('/api/recipes?sort=reviewCount,desc'),
        AxiosInterceptor.get('/api/reviews/recent'),
        AxiosInterceptor.get('/api/quantityGroupBuy/home'),
        AxiosInterceptor.get('/api/periodGroupBuy/home'),
    ]);

    const mappedRecipes = recipeRes.data.content.map((r: any) => ({
        recipeNo: r.recipeNo,
        thumbnail: r.thumbnailUrl,      
        title: r.title,
        nickname: r.writerNickname,   
        rating: r.averageRating,       
        reviewCount: r.reviewCount,
        servings: r.servings,
        makeTime: r.prepTime,          
        difficulty: r.difficulty,
        spicy: r.spicyLevel           
    }));
    return {
        recipes: mappedRecipes || [],
        quantityBuys: qtyRes.data || [],
        periodBuys: prdRes.data || [],
        reviews: reviewRes.data || []

    };


};