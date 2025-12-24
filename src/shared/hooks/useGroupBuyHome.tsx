import { useState, useEffect } from "react";
import { 
    getPeriodGroupBuyList, 
    getQuantityGroupBuyList,
    type PeriodGroupBuy,
    type QuantityGroupBuy
} from "../services/GroupBuyHomeApi";

export const useGroupBuyHome = () => {
    // 탭 상태
    const [activeTab, setActiveTab] = useState<'period' | 'quantity'>('period');
 
    // 데이터 상태
    const [periodList, setPeriodList] = useState<PeriodGroupBuy[]>([]);
    const [quantityList, setQuantityList] = useState<QuantityGroupBuy[]>([]);
    
    // 로딩 상태
    const [isPeriodLoading, setIsPeriodLoading] = useState<boolean>(false);
    const [isQuantityLoading, setIsQuantityLoading] = useState<boolean>(false);
    
    // 에러 상태
    const [periodError, setPeriodError] = useState<string | null>(null);
    const [quantityError, setQuantityError] = useState<string | null>(null);
    
    // 검색 및 정렬 상태
    const [keyword, setKeyword] = useState<string>('');
    const [orderBy, setOrderBy] = useState<string>('recent');

    // 기간공구 목록 로드
    const loadPeriodGroupBuyList = async () => {
        setIsPeriodLoading(true);
        setPeriodError(null);
        
        try {
            const data = await getPeriodGroupBuyList({ keyword, orderBy });
            setPeriodList(data);
        } catch (error) {
            console.error('기간공구 데이터 로드 중 오류 발생:', error);
            setPeriodError('기간공구 데이터를 불러오는 중 오류가 발생했습니다.');
            setPeriodList([]);
        } finally {
            setIsPeriodLoading(false);
        }
    };

    // 수량공구 목록 로드
    const loadQuantityGroupBuyList = async () => {
        setIsQuantityLoading(true);
        setQuantityError(null);
        
        try {
            const data = await getQuantityGroupBuyList({ keyword, orderBy });
            setQuantityList(data);
        } catch (error) {
            console.error('수량공구 데이터 로드 중 오류 발생:', error);
            setQuantityError('수량공구 데이터를 불러오는 중 오류가 발생했습니다.');
            setQuantityList([]);
        } finally {
            setIsQuantityLoading(false);
        }
    };

    // 탭 전환 핸들러
    const handleTabChange = (tab: 'period' | 'quantity') => {
        setActiveTab(tab);
        
        if (tab === 'period') {
            loadPeriodGroupBuyList();
        } else {
            loadQuantityGroupBuyList();
        }
    };

    // 검색 핸들러
    const handleSearch = (searchKeyword: string) => {
        setKeyword(searchKeyword);
    };

    // 정렬 핸들러
    const handleSortChange = (sortValue: string) => {
        setOrderBy(sortValue);
    };

    // 초기 로드 (기간공구 탭)
    useEffect(() => {
        loadPeriodGroupBuyList();
    }, []);

    // 검색어나 정렬 변경 시 현재 탭 데이터 새로고침
    useEffect(() => {
        if (activeTab === 'period') {
            loadPeriodGroupBuyList();
        } else {
            loadQuantityGroupBuyList();
        }
    }, [keyword, orderBy]);

    return {
        // 탭 상태
        activeTab,
        handleTabChange,
        
        // 데이터
        periodList,
        quantityList,
        
        // 로딩 상태
        isPeriodLoading,
        isQuantityLoading,
        
        // 에러 상태
        periodError,
        quantityError,
        
        // 검색 및 정렬
        keyword,
        orderBy,
        handleSearch,
        handleSortChange,
        
        // 수동 새로고침
        loadPeriodGroupBuyList,
        loadQuantityGroupBuyList
    };
};