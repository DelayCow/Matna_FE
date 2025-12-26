import { useState, useEffect } from "react";
import MyPageApi from "@/features/mypage/services/api/MyPageApi";

import { type MemberProfile } from "@/features/mypage/services/data/MyPageData";
import { type MyPageRecipe} from "@/features/mypage/components/MyPageRecipeCard";
import { type ReviewCardProps } from "@/shared/components/ReviewCard";
import { type GroupBuyItem } from "../components/MyPageGroupBuyCard";

import { useNavigate, useParams } from "react-router-dom";
import type { MyPageGroupBuy } from "../components/MyPageGroupBuyCard";

export const useMyPage = () => {

  const { id } = useParams<{ id: string }>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [recipes, setRecipes] = useState<MyPageRecipe[]>([]);
  const [reviews, setReviews] = useState<ReviewCardProps[]>([]);
  const [groupBuys, setGroupBuys] = useState<GroupBuyItem[]>([]);

  const [activeMainTab, setActiveMainTab] = useState<"content" | "group">("content");
  const [contentSubTab, setContentSubTab] = useState<"recipe" | "review">("recipe");
  const [groupSubTab, setGroupSubTab] = useState<"host" | "participate">("host");
  const [groupFilter, setGroupFilter] = useState("ALL");

  const [totalGroupCount, setTotalGroupCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  

  // const handleEditInfo = () => {
  //       showPasswordCheckModal 
        
  //   };

  const handleReport = async (targetNo: number) => {
        // 본인을 신고하는 경우 방어 로직 (이미 UI에서 막았지만 이중 체크)
        if (isOwner) return;

        const reason = window.prompt("신고 사유를 입력해주세요."); // 임시로 prompt 사용
        if (!reason) return;

        try {
            // 💡 나중에 MyPageApi.reportUser(targetNo, reason) 형태로 구현될 부분
            console.log(`신고 대상: ${targetNo}, 사유: ${reason}`);
            
            // API 호출 예시 (현재는 로그만)
            // await MyPageApi.reportUser({ targetMemberNo: targetNo, reason });
            
            alert("신고가 정상적으로 접수되었습니다.");
        } catch (error) {
            console.error("신고 실패:", error);
            alert("신고 처리 중 오류가 발생했습니다.");
        }
    };

  const handleDeleteRecipe = async (id: number) => {
        if (!window.confirm("삭제할까요?")) return;
        
        try {
            await MyPageApi.deleteRecipe(id); // API 파일 호출
            setRecipes(prev => prev.filter(r => r.id !== id)); // 상태 업데이트
            alert("삭제 완료!");
        } catch (e) {
            alert("삭제 실패");
        }
    };


    const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("au");
      window.location.href = "/login";
    }
  };



  // 공동구매 단계 계산 로직 (내부 함수)
  const calculateStep = (status: string): number => {
    const s = status?.trim().toUpperCase();
    switch (s) {
      case "OPEN": return 1;
      case "CLOSED": return 2;
      case "PAID": case "SHARED": return 3;
      case "DELIVERED": return 4;
      default: return 1;
    }
  };

  // 공동구매 데이터 가공 (step 주입)
  const formatGroupBuyData = (data: MyPageGroupBuy[]): GroupBuyItem[] => {
    return (data || []).map(item => ({
      ...item,
      step: calculateStep(item.status)
    }));
  };

  // 1. 초기 데이터 로드
  useEffect(() => {
    const initMyPage = async () => {
      try {
        const currentUser = await MyPageApi.fetchCurrentUser();
        

        const targetMemberNo = id ? parseInt(id) : currentUser.memberNo;


        setIsOwner(targetMemberNo === currentUser.memberNo);


        const [profileData, recipeData, reviewData, hostData, partData] = await Promise.all([
        
           MyPageApi.fetchProfile(targetMemberNo),
          MyPageApi.fetchRecipes(targetMemberNo),
          MyPageApi.fetchReviews(targetMemberNo),
          MyPageApi.fetchGroupBuys(targetMemberNo, "host", "ALL"),
          MyPageApi.fetchGroupBuys(targetMemberNo, "participation", "ALL")
        ]);

        setMember({ ...profileData, memberNo: targetMemberNo });

        // ✅ 레시피: 이제 MyPageRecipe 인터페이스(id, image, rating 등)에 맞춰 들어옵니다.
        setRecipes(recipeData || []);
        setReviews(reviewData || []);

        // ✅ 공동구매: formatGroupBuyData를 사용하여 step을 주입해서 저장합니다.
        const formattedHost = formatGroupBuyData(hostData);
        const formattedPart = formatGroupBuyData(partData);

        setTotalGroupCount(formattedHost.length + formattedPart.length);
        setGroupBuys(formattedHost); // 초기값은 '개설' 탭 데이터

      } catch (error) {
        console.error("마이페이지 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initMyPage();
  }, [id]);

  // 2. 탭/필터 변경 시 공동구매 데이터 리로드
  useEffect(() => {
    if (!member || activeMainTab !== "group") return;

    const loadGroupBuys = async () => {
      try {
        const typePath = groupSubTab === "host" ? "host" : "participation";
        const data = await MyPageApi.fetchGroupBuys(member.memberNo, typePath, groupFilter);

        // ✅ 여기서도 반드시 가공 함수를 거쳐야 MyPage.tsx에서 item.step을 읽을 수 있습니다.
        setGroupBuys(formatGroupBuyData(data));
      } catch (error) {
        console.error("공동구매 데이터 로드 실패:", error);
        setGroupBuys([]);
      }
    };
    loadGroupBuys();
  }, [groupSubTab, groupFilter, member, activeMainTab]);

  return {
    member, recipes, reviews, groupBuys, isLoading, totalGroupCount,
    activeMainTab, setActiveMainTab,
    contentSubTab, setContentSubTab,
    groupSubTab, setGroupSubTab,
    groupFilter, setGroupFilter,
    isOwner, handleDeleteRecipe,
    handleLogout, handleReport
    // handleEditInfo
  };
};