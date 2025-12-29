import "@/features/mypage/styles/mypage.css";
import React from "react";


export interface MyPageGroupBuy {
  periodGroupBuyNo: number;
  quantityGroupBuyNo: number;
  groupBuyNo: number;
  title: string;
  status: string;
  imageUrl: string;
  unit: string;
  inDate: string;
  buyEndDate: number;
  shareEndDate: number;
  buyDate: string;
  arrivalDate: string;
  arrivalImageUrl: string;
  receiveDate: string;
  receiptImageUrl: string;
  remainingQuantity: number;
  myQuantity: number;
  participatedDate: string;
  finalPaymentPoint: number;
  participantExMe: number;
  totalSettlementPoint: number;
  DueDate: string;
  groupParticipantNo: number;
  paymentNote: string;
  creatorNo: number;
}

export interface GroupBuyItem extends MyPageGroupBuy {
  step?: number;
}

interface MyPageGroupBuyCardProps {
  item: GroupBuyItem;
  isHost: boolean;
  onAction: (action: string, item: GroupBuyItem) => void;
}




export const MyPageGroupBuyCard = ({ item, isHost, onAction }: MyPageGroupBuyCardProps) => {
  const steps = ["모집", "상품결제", "상품도착", "나눔진행"];

  const currentStep = item.step || "";

  
  const renderActionBtn = () => {
   
    const containerClass = "d-flex flex-column gap-1 ms-3";
    const containerStyle: React.CSSProperties = {
      minWidth: '120px',
      position: 'relative',
      zIndex: 50,          
      flexShrink: 0        
    };

    // 2. 클릭 이벤트가 다른 곳(상세이동)으로 새지 않도록 막는 함수
    const handleBtnClick = (e: React.MouseEvent, action: string) => {
      e.preventDefault();  
      e.stopPropagation(); 
      onAction(action, item);
    };

 
    if (isHost) {
      return (
        <div className={containerClass} style={containerStyle}>
          <button
            className="btn btn-danger btn-sm"
            disabled={status !== 'closed'}
            onClick={(e) => handleBtnClick(e, 'REG_PAYMENT')}
          >
            결제정보 등록
          </button>

          <button
            className="btn btn-success btn-sm"
            disabled={status !== 'paid'}
            onClick={(e) => handleBtnClick(e, 'REG_ARRIVAL')}
          >
            도착정보 등록
          </button>
        </div>
      );
    }

    // [Participant: 참여자]
    else {
      if (status === 'open') {
        return (
          <div className={containerClass} style={containerStyle}>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={(e) => handleBtnClick(e, 'CANCEL')}
            >
              참여 취소
            </button>
          </div>
        );
      }

      return (
        <div className={containerClass} style={containerStyle}>
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={!['paid', 'delivered', 'shared'].includes(status)}
            onClick={(e) => handleBtnClick(e, 'VIEW_PAYMENT')}
          >
            결제정보 확인
          </button>

          <button
            className="btn btn-outline-success btn-sm"
            disabled={!['delivered', 'shared'].includes(status)}
            onClick={(e) => handleBtnClick(e, 'VIEW_ARRIVAL')}
          >
            도착정보 확인
          </button>

          {!item.receiveDate && (
            <button
              className="btn btn-success btn-sm"
              disabled={status !== 'delivered'}
              onClick={(e) => handleBtnClick(e, 'CONFIRM_SHARE')}
            >
              나눔 받았어요!
            </button>
          )}

          {item.receiveDate && (
            <button className="btn btn-secondary btn-sm" disabled>수령 완료</button>
          )}
        </div>
      );
    }
  };

  
  const renderStatusMessage = () => {
    if (isHost && (status === 'shared')) {
      return <div className="text-success small fw-bold mt-1"><i className="bi bi-people-fill me-1"></i>모든 참여자 수령 완료</div>;
    }
    if (!isHost && item.receiveDate) {
      return <div className="text-success small fw-bold mt-1"><i className="bi bi-check-circle-fill me-1"></i>수령 완료</div>;
    }
    return null;
  };

  return (
    <div className="group-card mb-3 p-3 border rounded bg-white shadow-sm">
      {/* 1. 타임라인 영역 */}
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="flex-grow-1 me-3">
          <div className="timeline-steps">
            {steps.map((stepName, index) => {
              const stepNum = index + 1;
              const activeClass = (stepNum < currentStep)
                ? "active"
                : (stepNum === currentStep ? "current" : "");
              return (
                <div key={stepName} className={`step-item ${activeClass}`}>
                  <div className="step-circle"></div>
                  <span className="step-text">{stepName}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. 카드 본문 (이미지 + 정보 + 버튼) */}
      <div className="d-flex align-items-center justify-content-between position-relative">

       
        <div
          className="d-flex align-items-center gap-3 flex-grow-1"
          style={{ cursor: 'pointer', position: 'relative', zIndex: 1 }}
          onClick={() => onAction('GO_DETAIL', item)}
        >
          <div className="rounded overflow-hidden border" style={{ width: '70px', height: '70px', flexShrink: 0 }}>
            <img
              src={item.imageUrl || '/img/default_food.jpg'}
              className="w-100 h-100 object-fit-cover"
              alt={item.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; 
                target.src = '/src/assets/matna_logo.png';
              }}
            />
          </div>
          <div className="group-info">
            <h6 className="fw-bold mb-0 text-truncate" style={{ maxWidth: '220px' }}>{item.title}</h6>
            {renderStatusMessage()}
          </div>
        </div>


        {renderActionBtn()}
      </div>
    </div>
  );
};