import { useState, useEffect } from "react";
import MyPageApi from "@/features/mypage/services/api/MypageApi";



import { useParams } from "react-router-dom";
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
        
        console.log(targetMemberNo);
        console.log(currentUser.memberNo);

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
    isOwner
  };
};