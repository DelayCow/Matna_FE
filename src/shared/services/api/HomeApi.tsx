
import QuantityGroupBuyCard from "@/shared/components/QuantityGroupBuyCard";
import AxiosInterceptor from "@/shared/services/AxiosInterceptor"; 

export const fetchHomeData = async () => {
    


    const [recipeRes,  reviewRes, qtyRes, prdRes] = await Promise.all([
        AxiosInterceptor.get('/api/recipes?sort=reviewCount,desc'),
        AxiosInterceptor.get('/api/reviews/recent'),
        AxiosInterceptor.get('/api/quantityGroupBuy/home'),
        AxiosInterceptor.get('/api/periodGroupBuy/home'),
    ]);

    return {
        recipes: recipeRes.data.content || [],
        quantityBuys: qtyRes.data || [],
        periodBuys: prdRes.data || [],
        reviews: reviewRes.data || []

    };


};