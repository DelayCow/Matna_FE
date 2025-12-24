import { useState, useEffect } from "react";
import { fetchHomeData } from "@/shared/services/api/HomeApi";

export const useHome = () => {
    // 1. 데이터 상태
    const [recipes, setRecipes] = useState([]);
    const [quantityBuys, setQuantityBuys] = useState([]);
    const [periodBuys, setPeriodBuys] = useState([]);
    const [reviews, setReviews] = useState([]);

    // 2. 로딩 및 에러 상태
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 3. 데이터 로드 함수
    const loadAllData = async () => {
        setIsLoading(true);
        try {
            const data = await fetchHomeData();
            setRecipes(data.recipes);
            setQuantityBuys(data.quantityBuys);
            setPeriodBuys(data.periodBuys);
            setReviews(data.reviews);
        } catch (err) {
            setError("데이터를 불러오는 중 문제가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    // 4. 컴포넌트에서 쓸 것들만 내보내기
    return {
        recipes,
        quantityBuys,
        periodBuys,
        reviews,
        isLoading,
        error,
        refresh: loadAllData // 새로고침 기능도 추가 가능
    };
};