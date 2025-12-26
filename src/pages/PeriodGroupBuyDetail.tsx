import GroupBuyHeader from "@/features/groupBuy/componets/GroupBuyHeader";
import ParticipantInGroupBuy from "@/features/groupBuy/componets/ParticipantInGroupBuy";
import RecipeInGroupBuy from "@/features/groupBuy/componets/RecipeInGroupBuy";
import ShareLocation from "@/features/groupBuy/componets/ShareLocation";
import { usePeriodGroupBuyDetail } from "@/features/groupBuy/hooks/usePeriodGroupBuyDetail";
import PeriodDetailInfo from "@/features/groupBuy/componets/period/PeriodDetailInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PeriodModal from "@/features/groupBuy/componets/period/PeriodModal";
import  "@/features/groupBuy/styles/PeriodDetail.css"


export default function PeriodGroupBuyDetail(){
    const {periodGroupBuyNo} = useParams<{periodGroupBuyNo: string}>();
    const groupBuyNo = periodGroupBuyNo? parseInt(periodGroupBuyNo): 0;
    const {
        groupBuyDetail,
        participants,
        recipes,
        userStatus,
        isLoading,
        error,
        isActionLoading,
        handleJoin,
        handleCancel,
        handleStop
    } = usePeriodGroupBuyDetail(groupBuyNo);

    // 모달 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

        // 로딩 중
    if (isLoading) {
        return (
            <div className="mobile-container">
                <div className="container-fluid content-area p-0">
                    <div className="p-5 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">로딩 중...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 에러 발생
    if (error || !groupBuyDetail) {
        return (
            <div className="mobile-container">
                <div className="container-fluid content-area p-0">
                    <div className="p-5 text-center text-danger">
                        {error || '공동구매 정보를 불러올 수 없습니다.'}
                    </div>
                </div>
            </div>
        );
    }

    // 날짜 포맷팅
    const formatShareDate = () => {
        return `모집 마감 후 ${groupBuyDetail.buyEndDate || '?'}일 이내`;
    };
    const formatBuyDate = () => {
        return `상품 수령 후 수령일포함 ${groupBuyDetail.shareEndDate || '?'}일 뒤 ${groupBuyDetail.shareTime || ''}`;
    };


    return (
        <div className="mobile-container position-relative">
            <div className="container-fluid content-area p-0">
                {/* 헤더 */}
                <GroupBuyHeader
                    imageUrl={groupBuyDetail.imageUrl}
                    title={groupBuyDetail.title}
                    authorNickname={groupBuyDetail.nickname}
                    authorProfileUrl={groupBuyDetail.profileImageUrl}
                    authorNo={groupBuyDetail.creatorNo}
                    itemSaleUrl={groupBuyDetail.itemSaleUrl}
                />

                {/* 상세 정보 */}
                <div className="group-buy-product p-3">
                    <PeriodDetailInfo
                        price={groupBuyDetail.price}
                        feeRate={groupBuyDetail.feeRate}
                        maxParticipants={groupBuyDetail.maxParticipants}
                        currentParticipants={participants.length}
                        dueDate={groupBuyDetail.dueDate}
                        quantity={groupBuyDetail.quantity}
                        unit={groupBuyDetail.unit}

                        userStatus={userStatus}
                        isActionLoading={isActionLoading}
                        onButtonClick={() => setIsModalOpen(true)}
                    />

                

                    {/* 상세 내용 */}
                    <p className="text-center bg-light p-2 rounded small text-muted mt-3">
                        {groupBuyDetail.content || '공동구매에 대한 상세 설명이 없습니다.'}
                    </p>

                    {/* 나눔 장소 */}
                    <ShareLocation
                        shareLocation={groupBuyDetail.shareLocation}
                        shareDetailAddress={groupBuyDetail.shareDetailAddress}
                        buyDate={formatBuyDate()}
                        shareDate={formatShareDate()}
                    />
                </div>

                {/* 레시피 추천 */}
                <RecipeInGroupBuy recipes={recipes} />

                {/* 참여자 목록 */}
                <ParticipantInGroupBuy
                    participants={participants}
                    type="period"
                />
            </div>

            {/* 모달 */}
            {isModalOpen && (
                <PeriodModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    userStatus={userStatus}
                    groupBuyDetail={groupBuyDetail}
                    participants={participants}
                    isActionLoading={isActionLoading}
                    onJoin={handleJoin}
                    onCancel={handleCancel}
                    onStop={handleStop}
                />
            )}
        </div>
    );
}