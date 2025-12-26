import { useState, useEffect } from "react";
import {
    getCurrentUser,
    getPeriodGroupBuyDetail,
    joinPeriodGroupBuy,
    cancelParticipation,
    stopPeriodGroupBuy
} from "../services/api/PeriodGroupBuyDetailApi";
import {
    type PeriodGroupBuyDetail,
    type PeriodParticipant,
    type PeriodRecipe,
    type UserStatus
} from "../services/data/PeriodGroupBuyData";


export const usePeriodGroupBuyDetail = (periodGroupBuyNo: number) => {
    //상세조회 데이터
    const [groupBuyDetail, setGroupBuyDetail] = useState<PeriodGroupBuyDetail | null>(null);
    const [participants, setParticipants] = useState<PeriodParticipant[]>([]);
    const [recipes, setRecipes] = useState<PeriodRecipe[]>([]);

    //사용자 상태
    const [currentMemberNo, setCurrentMemberNo] = useState<number | null>(null);
    const [userStatus, setUserStatus] = useState<UserStatus>('normal');
    const [myGroupBuyParticipantNo, setMyGroupBuyParticipantNo] = useState<number | null>(null);

    //로딩 및 에러 상태
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //액션 로딩 상태
    const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

    //데이터 로드
    const loadDetail = async () => {
        setIsLoading(true);
        setError(null);

        try {
            //사용자 인증 정보 조회
            const authData = await getCurrentUser();
            console.log('authData', authData);
            const memberNo = authData.memberNo;
            console.log('memberNo: ',memberNo);
            setCurrentMemberNo(authData.memberNo);

            //공동구매 상세 조회
            const data = await getPeriodGroupBuyDetail(periodGroupBuyNo);
            console.log('data: ', data);
            setGroupBuyDetail(data.groupBuyDetail);
            setParticipants(data.participants);
            setRecipes(data.recipes);

            //사용자 상태 결정
            determineUserStatusWithMemberNo(data.groupBuyDetail, data.participants, memberNo);
        }catch (err) {
            console.error('데이터 로드 중 오류 발생:', err);
            const errorMessage = err instanceof Error ? err.message: '데이터를 불러오는 중 오류가 발생했습니다.';
            setError(errorMessage);
        }finally{
            setIsLoading(false);
        }
    };

    //사용자 상태 결정
    const determineUserStatusWithMemberNo = (detail: PeriodGroupBuyDetail, participantList: PeriodParticipant[], memberNo: number | null) => {
        if (!memberNo){
            setUserStatus('normal');
            return;
        }
        
        //개설자
        if(memberNo === detail.creatorNo) {
            setUserStatus('creator');
            return;
        }
        //참여자
        const myParticipation = participantList.find(p => p.memberNo === memberNo);
        if(myParticipation) {
            setUserStatus('participant');
            setMyGroupBuyParticipantNo(myParticipation.groupParticipantNo);
            return;
        }
        //그 외(미참여자)
        setUserStatus('normal');
    }


    // 공동구매 참여
    const handleJoin = async (): Promise<boolean> => {
        if (!groupBuyDetail) return false;

        if (!window.confirm('공동구매에 참여하시겠습니까?')) {
            return false;
        }

        setIsActionLoading(true);
        try {
            const response = await joinPeriodGroupBuy({ groupBuyNo: groupBuyDetail.groupBuyNo });
            
            if (response.success) {
                alert(response.message);
                await loadDetail(); // 데이터 새로고침
                return true;
            } else {
                alert(response.message || '참여에 실패했습니다.');
                return false;
            }
        } catch (err) {
            console.error('참여 오류:', err);
            alert('참여 중 오류가 발생했습니다.');
            return false;
        } finally {
            setIsActionLoading(false);
        }
    };

    // 참여 취소
    const handleCancel = async (): Promise<boolean> => {
        if (!myGroupBuyParticipantNo) {
            alert('참여 정보를 찾을 수 없습니다.');
            return false;
        }

        if (!window.confirm('정말 참여를 취소하시겠습니까?')) {
            return false;
        }

        setIsActionLoading(true);
        try {
            const response = await cancelParticipation(myGroupBuyParticipantNo);
            
            if (response.success) {
                alert(response.message);
                await loadDetail(); // 데이터 새로고침
                return true;
            } else {
                alert(response.message || '취소에 실패했습니다.');
                return false;
            }
        } catch (err) {
            console.error('취소 오류:', err);
            alert('취소 중 오류가 발생했습니다.');
            return false;
        } finally {
            setIsActionLoading(false);
        }
    };

    // 공동구매 중단 (개설자)
    const handleStop = async (cancelReason: string): Promise<boolean> => {
        if (!groupBuyDetail) return false;

        if (!cancelReason.trim()) {
            alert('중단 사유를 입력해주세요.');
            return false;
        }

        if (!window.confirm('공동구매를 중단하시겠습니까?')) {
            return false;
        }

        setIsActionLoading(true);
        try {
            const response = await stopPeriodGroupBuy(groupBuyDetail.groupBuyNo, { cancelReason });
            
            if (response.success) {
                alert(response.message);
                await loadDetail(); // 데이터 새로고침
                return true;
            } else {
                alert(response.message || '중단에 실패했습니다.');
                return false;
            }
        } catch (err) {
            console.error('중단 오류:', err);
            alert('중단 중 오류가 발생했습니다.');
            return false;
        } finally {
            setIsActionLoading(false);
        }
    };

    //초기 로드
    useEffect(() => {
        if (periodGroupBuyNo) {
            loadDetail();
        }
    }, [periodGroupBuyNo]);

    return {
        //데이터
        groupBuyDetail,
        participants,
        recipes,

        //사용자 상태
        currentMemberNo,
        userStatus,
        myGroupBuyParticipantNo,

        //로딩 및 에러
        isLoading,
        error,
        isActionLoading,

        //모달 액션
        handleJoin,
        handleCancel,
        handleStop,

        loadDetail
    };
};