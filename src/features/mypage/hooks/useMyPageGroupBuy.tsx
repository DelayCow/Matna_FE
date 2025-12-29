import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyPageApi from "@/features/mypage/services/api/MyPageApi";
import { type GroupBuyItem, type MyPageGroupBuy } from "../components/MyPageGroupBuyCard";

export const useMyPageGroupBuy = (
    memberNo: number | undefined, 
    activeMainTab: string
) => {
    const navigate = useNavigate();

    // 1. 상태 관리 (탭, 필터, 데이터, 카운트)
    const [groupBuys, setGroupBuys] = useState<GroupBuyItem[]>([]);
    const [totalGroupCount, setTotalGroupCount] = useState(0);
    const [groupSubTab, setGroupSubTab] = useState<"host" | "participate">("host");
    const [groupFilter, setGroupFilter] = useState("ALL");

    
    const calculateStep = (status: string): number => {
        
        switch (status) {
        case 'open':  return 1;
            case 'closed': return 2;
            case 'paid': return 3;
            case 'delivered': return 4;
            case 'shared': return 5;
            case 'canceled': return 0;
            default: return 1;
        }
    };

    const formatGroupBuyData = (data: MyPageGroupBuy[]): GroupBuyItem[] => {
        return (data || []).map(item => ({
            ...item,
            step: calculateStep(item.status)
        }));
    };

    // 3. 탭/필터 변경 시 데이터 리로드 로직 (useEffect 이동)
    useEffect(() => {
       
        if (!memberNo || activeMainTab !== "group") return;

        const loadGroupBuys = async () => {
            try {
                const typePath = groupSubTab === "host" ? "host" : "participation";
                const data = await MyPageApi.fetchGroupBuys(memberNo, typePath, groupFilter);
               const validData = (data || []).filter(item => item.status !== 'canceled');
                setGroupBuys(formatGroupBuyData(validData));
            } catch (error) {
                // 모달 대체
                setGroupBuys([]);
            }
        };
        loadGroupBuys();
    }, [groupSubTab, groupFilter, memberNo, activeMainTab]);

    
    const handleGroupAction = async (action: string, item: GroupBuyItem) => {
        try {
            switch (action) {
                case 'CANCEL': {
                   
                    const type = item.periodGroupBuyNo ? "PERIOD" : "QUANTITY";
                    await MyPageApi.cancelParticipation(item.groupParticipantNo, type);
                    window.location.reload();
                    break;
                }
                case 'REG_PAYMENT':
                    // 결제 정보 등록
                    break;
                case 'REG_ARRIVAL':
                    // 도착 정보 등록
                    break;
                case 'VIEW_PAYMENT':
                    //결제 정보 확인
                    break;
                case 'VIEW_ARRIVAL':
                    //도착 정보 확인
                    break;
                case 'CONFIRM_SHARE': {
                    
                    await MyPageApi.confirmShare(item.groupParticipantNo);
                    window.location.reload();
                    break;
                }
                case 'GO_DETAIL':
                    const detailUrl = item.periodGroupBuyNo
                        ? `/periodGroupBuy/detail/${item.periodGroupBuyNo}`
                        : `/quantityGroupBuy/detail/${item.quantityGroupBuyNo}`;
                    navigate(detailUrl);
                    break;
                default:
                    console.warn("알 수 없는 액션:", action);
            }
        } catch (error) {
            

        // 추후 모달 대체
        }
    };

    // 5. 외부로 노출할 데이터와 함수들
    return {
        groupBuys,
        setGroupBuys,
        totalGroupCount,
        setTotalGroupCount,
        groupSubTab,
        setGroupSubTab,
        groupFilter,
        setGroupFilter,
        handleGroupAction,
        formatGroupBuyData 
    };
};