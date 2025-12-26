import { useState } from 'react';
import PeriodPriceTable from './PeriodPriceTable';
import {
    type PeriodGroupBuyDetail,
    type PeriodParticipant,
    type UserStatus
} from '@/features/groupBuy/services/data/PeriodGroupBuyData';

interface PeriodGroupBuyModalProps {
    isOpen: boolean;
    onClose: () => void;
    userStatus: UserStatus;
    groupBuyDetail: PeriodGroupBuyDetail;
    participants: PeriodParticipant[];
    isActionLoading: boolean;
    onJoin: () => Promise<boolean>;
    onCancel: () => Promise<boolean>;
    onStop: (reason: string) => Promise<boolean>;
}

export default function PeriodModal({
    isOpen,
    onClose,
    userStatus,
    groupBuyDetail,
    participants,
    isActionLoading,
    onJoin,
    onCancel,
    onStop
}: PeriodGroupBuyModalProps) {
    const [cancelReason, setCancelReason] = useState<string>('');

    if (!isOpen) return null;

    // 계산
    const totalWithFee = groupBuyDetail.price * (1 + groupBuyDetail.feeRate / 100);
    const currentCount = participants.length + 1;
    const estimatedAmount = Math.round(totalWithFee / 2);
    const refundAmount = Math.round(totalWithFee / currentCount);

    // 액션 핸들러
    const handleAction = async () => {
        let success = false;

        if (userStatus === 'normal') {
            success = await onJoin();
        } else if (userStatus === 'participant') {
            success = await onCancel();
        } else if (userStatus === 'creator') {
            success = await onStop(cancelReason);
        }

        if (success) {
            onClose();
        }
    };

    return (
        <>
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-body p-4 text-center">
                            <button type="button" className="btn-close position-absolute top-0 end-0 m-3" 
                                onClick={onClose} aria-label="Close" />


                            {userStatus === 'normal' && (
                                <>
                                    <h5 className="fw-bold mb-3">공동구매 참여하기</h5>
                                    <p className="small text-muted mb-4">아래 금액으로 참여하시겠습니까?</p>

                                    <div id="personArea">
                                        <div className="mb-4">
                                            <span className="fs-4 fw-bold">현재 참여인원</span>
                                            <span className="fs-2 fw-bold text-danger ms-2">
                                                {currentCount}명
                                            </span>
                                        </div>

                                        <div className="table-responsive small mx-auto mb-3" style={{ maxWidth: '250px' }}>
                                            <PeriodPriceTable
                                                maxParticipants={groupBuyDetail.maxParticipants}
                                                price={groupBuyDetail.price}
                                                feeRate={groupBuyDetail.feeRate}
                                                quantity={groupBuyDetail.quantity}
                                                unit={groupBuyDetail.unit}
                                            />
                                        </div>

                                        <div className="text-center mb-2">
                                            <span className="fs-5 fw-bold me-2">결제 예정 금액</span>
                                            <span className="fs-3 fw-bold text-danger">
                                                {estimatedAmount.toLocaleString()}원
                                            </span>
                                        </div>
                                        <p className="small text-danger mb-4">
                                            최종 참여인원에 따른 차액은 공동구매 마감기간 이후 3일 이내 환불됩니다.
                                        </p>
                                    </div>
                                </>
                            )}

                            {userStatus === 'participant' && (
                                <>
                                    <h5 className="fw-bold mb-3">공동구매 참여 취소</h5>
                                    <p className="small text-muted mb-4">정말 참여를 취소하시겠습니까?</p>

                                    <div id="cancelConfirmArea">
                                        <div className="text-center mb-4">
                                            <span className="fs-5 fw-bold me-2">환불 예정 금액</span>
                                            <span className="fs-3 fw-bold text-danger">
                                                {refundAmount.toLocaleString()}원
                                            </span>
                                        </div>
                                        <p className="small text-muted">포인트가 즉시 환불됩니다.</p>
                                    </div>
                                </>
                            )}

                            {userStatus === 'creator' && (
                                <>
                                    <h5 className="fw-bold mb-3">
                                        공동구매를 정말 <span className="text-danger">중단</span>하시겠습니까?
                                    </h5>
                                    <p className="small text-muted mb-4">모든 참여자에게 포인트가 환불됩니다.</p>

                                    <div className="mb-4 text-start">
                                        <span className="d-block small fw-bold mb-1">사유</span>
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            placeholder="중단 사유를 입력해주세요."
                                            value={cancelReason}
                                            onChange={(e) => setCancelReason(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {/* 액션 버튼 */}
                            <div className="d-grid">
                                <button
                                    type="button"
                                    className="btn btn-danger py-2 fw-bold"
                                    onClick={handleAction}
                                    disabled={isActionLoading}
                                >
                                    {isActionLoading ? (
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                    ) : null}
                                    {userStatus === 'normal' && '참여하기'}
                                    {userStatus === 'participant' && '취소하기'}
                                    {userStatus === 'creator' && '중단하기'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}