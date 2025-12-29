import { useState, useEffect } from "react";
import MyPageApi from "@/features/mypage/services/api/MyPageApi";

import { type MemberProfile } from "@/features/mypage/services/data/MyPageData";
import { type MyPageRecipe} from "@/features/mypage/components/MyPageRecipeCard";
import { useMyPageRecipe } from "./useMyPageRecipe";
import { useMyPageGroupBuy } from "./useMyPageGroupBuy"; 
import { useMyPageReview } from "./useMyPageReview";
import { type ReviewCardProps } from "@/shared/components/ReviewCard";
import { type GroupBuyItem } from "../components/MyPageGroupBuyCard";

import { useNavigate, useParams } from "react-router-dom";
import type { MyPageGroupBuy } from "../components/MyPageGroupBuyCard";

export const useMyPage = () => {

const navigate = useNavigate();

  const { memberNo: paramMemberNo } = useParams<{ memberNo: string }>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [member, setMember] = useState<MemberProfile | null>(null);
  
 

  const [activeMainTab, setActiveMainTab] = useState<"content" | "group">("content");
  const [contentSubTab, setContentSubTab] = useState<"recipe" | "review">("recipe");

  const [isLoading, setIsLoading] = useState(true);

  const { recipes, setRecipes, handleDeleteRecipe } = useMyPageRecipe();
  const { reviews, setReviews, handleReviewClick } = useMyPageReview();


  const { 
        groupBuys, setGroupBuys, 
        totalGroupCount, setTotalGroupCount,
        groupSubTab, setGroupSubTab,
        groupFilter, setGroupFilter,
        handleGroupAction,
        formatGroupBuyData
    } = useMyPageGroupBuy(member?.memberNo, activeMainTab);


  

  const handleReport = async (targetNo: number) => {
        if (isOwner) return;

        const reason = window.prompt("신고 사유를 입력해주세요.");
        if (!reason) return;

        try {
           
            console.log(`신고 대상: ${targetNo}, 사유: ${reason}`);
            
           
        } catch (error) {
            console.error("신고 실패:", error);
         
        }
    };




    const handleLogout = () => {
     
      sessionStorage.removeItem("au");
      window.location.href = "/login";
    
  };

  const handleWithdraw = () => {
    console.log("탈퇴 버튼");
  };



 

  // 1. 초기 데이터 로드
  useEffect(() => {
    const initMyPage = async () => {
      try {
        const currentUser = await MyPageApi.fetchCurrentUser();
        

       const targetMemberNo = paramMemberNo ? parseInt(paramMemberNo) : currentUser.memberNo;


        setIsOwner(targetMemberNo === currentUser.memberNo);


        const [profileData, recipeData, reviewData, hostData, partData] = await Promise.all([
        
           MyPageApi.fetchProfile(targetMemberNo),
          MyPageApi.fetchRecipes(targetMemberNo),
          MyPageApi.fetchReviews(targetMemberNo),
          MyPageApi.fetchGroupBuys(targetMemberNo, "host", "ALL"),
          MyPageApi.fetchGroupBuys(targetMemberNo, "participation", "ALL")
        ]);

        setMember({ ...profileData, memberNo: targetMemberNo });

    
        setRecipes(recipeData || []);
        setReviews(reviewData || []);

       
        const formattedHost = formatGroupBuyData(hostData);
        const formattedPart = formatGroupBuyData(partData);

        setTotalGroupCount(formattedHost.length + formattedPart.length);
        setGroupBuys(formattedHost); 

      } catch (error) {
        console.error("마이페이지 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initMyPage();
  }, [paramMemberNo, setRecipes, setReviews, setGroupBuys, setTotalGroupCount]);



  return {
    member, recipes, reviews, groupBuys, isLoading, totalGroupCount,
    activeMainTab, setActiveMainTab,
    contentSubTab, setContentSubTab,
    groupSubTab, setGroupSubTab,
    groupFilter, setGroupFilter,
    isOwner, handleDeleteRecipe,
    handleLogout, handleReport,
    handleGroupAction, handleReviewClick
    // handleEditInfo
  };
};