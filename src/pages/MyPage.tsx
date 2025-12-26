import { useMyPage } from "@/features/mypage/hooks/useMyPage";

import { MyPageProfileCard } from "@/features/mypage/components/MyPageProfile";

import { ReviewCard, type ReviewCardProps } from "@/shared/components/ReviewCard";
import { MyPageRecipeCard, type MyPageRecipe } from "@/features/mypage/components/MypageRecipeCard";
import { MyPageGroupBuyCard, type GroupBuyItem } from "@/features/mypage/components/MyPageGroupBuyCard";

import "@/features/mypage/styles/mypage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MyPage() {
    const navigate = useNavigate();
    const {
        member, isOwner, recipes, reviews, groupBuys, isLoading,
        activeMainTab, setActiveMainTab, contentSubTab, setContentSubTab,
        groupSubTab, setGroupSubTab, groupFilter, setGroupFilter, totalGroupCount
    } = useMyPage();

    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem("au");
        window.location.href = "/login";
    };

    const handleDeleteRecipe = (id: number) => { 
    if (window.confirm("정말 이 레시피를 삭제하시겠습니까?")) {
        console.log("레시피 삭제 요청 ID:", id);
    }
};

    if (isLoading) return <div className="p-5 text-center">데이터를 가져오는 중...</div>;

   

    return (
        <div className="mobile-container bg-light min-vh-100">
            
            {/* 1️⃣ 프로필 섹션 (헤더 없이 여기서부터 시작) */}
            <MyPageProfileCard 
                member={member} 
                isOwner={isOwner} 
                onReport={(no) => console.log("신고유저번호:", no)} 
            />


            {/* 통계 탭 */}
            <section className="stats-tabs d-flex text-center border-top border-bottom bg-white">
                <div className={`tab-item w-50 py-3 pointer ${activeMainTab === 'content' ? 'active' : ''}`}
                    onClick={() => setActiveMainTab('content')}>
                    <strong className="d-block fs-4">{recipes.length + reviews.length}</strong>
                    <span className="text-secondary small">활동</span>
                </div>
                <div className={`tab-item py-3 w-50 pointer ${activeMainTab === 'group' ? 'active' : ''}`}
                    onClick={() => setActiveMainTab('group')}>
                    <strong className="d-block fs-4">{totalGroupCount}</strong>
                    <span className="text-secondary small">공동구매</span>
                </div>
            </section>

            <div className="p-3">
                {activeMainTab === 'content' ? (
                    <>
                        <div className="btn-group w-100 mb-3 shadow-sm">
                            <button className={`btn btn-sm ${contentSubTab === 'recipe' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setContentSubTab('recipe')}>레시피</button>
                            <button className={`btn btn-sm ${contentSubTab === 'review' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setContentSubTab('review')}>후기</button>
                        </div>
                        <div className="grid-container mypage-review-list">
                            {contentSubTab === 'recipe' ?
                                recipes.map((r: MyPageRecipe) => (
                                    <MyPageRecipeCard
                                        
                                        key={r.id}
                                        item={r}
                                        isOwner={true}
                                        // onDelete 역시 r.id를 넘겨줘야 함
                                        onDelete={() => handleDeleteRecipe(r.id)}
                                    />
                                )) :
                                reviews.map((rv: ReviewCardProps) => (
                                    <ReviewCard key={rv.reviewNo} {...rv} onClickDetail={() => { }} />
                                ))
                            }
                        </div>
                    </>
                ) : (
                    <div id="group-section-wrapper">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="btn-group btn-group-sm">
                                <button className={`btn ${groupSubTab === 'host' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setGroupSubTab('host')}>개설</button>
                                <button className={`btn ${groupSubTab === 'participate' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setGroupSubTab('participate')}>참여</button>
                            </div>
                            <select className="form-select form-select-sm w-auto border-success" value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}>
                                <option value="ALL">전체</option>
                                <option value="OPEN">모집중</option>
                                <option value="CLOSED">모집마감</option>
                                <option value="PAID">결제완료</option>
                                <option value="SHARED">나눔중</option>
                                <option value="DELIVERED">도착완료</option>
                            </select>
                        </div>

                        <div id="group-list" className="grid-container">
                            {groupBuys.length > 0 ? (
                                // ✅ any 제거 완료
                                groupBuys.map((item: GroupBuyItem) => (
                                    <MyPageGroupBuyCard
                                        key={item.groupBuyNo}
                                        item={item}
                                        step={item.step}
                                        isHost={groupSubTab === 'host'}
                                        onAction={(action, data) => console.log(action, data)}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-5 text-muted">내역이 없습니다.</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}