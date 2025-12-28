import "@/features/mypage/styles/mypage.css";
import React from "react";

// ✅ 인터페이스 정의
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

// ✅ 상태 단계를 숫자로 변환 (대소문자 변환 제거: DB값 그대로 사용)
export const getStatusStep = (status: string = ""): number => {
  const s = status.trim(); // 🟢 소문자 변환 제거
  switch (s) {
    case 'open': case 'recruiting': return 1;
    case 'closed': case 'payment_wait': return 2;
    case 'paid': return 3;
    case 'delivered': case 'shared': case 'completed': return 4;
    default: return 1;
  }
};

export const MyPageGroupBuyCard = ({ item, isHost, onAction }: MyPageGroupBuyCardProps) => {
  const steps = ["모집", "상품결제", "상품도착", "나눔진행"];

  // 🟢 대소문자 변환 제거: DB 데이터 그대로 사용 (trim만 적용)
  const status = (item.status || "").trim();
  const currentStep = getStatusStep(status);

  // ✅ 버튼 렌더링 로직 (클릭 방어 + 수직 배치)
  const renderActionBtn = () => {
    // 1. 컨테이너 스타일: 수직 배치 + z-index로 최상단 확보
    const containerClass = "d-flex flex-column gap-1 ms-3";
    const containerStyle: React.CSSProperties = {
      minWidth: '120px',
      position: 'relative',
      zIndex: 50,           // 🟢 값을 50으로 높여서 확실하게 위로 올림
      flexShrink: 0         // 화면이 좁아져도 찌그러지지 않음
    };

    // 2. 클릭 이벤트가 다른 곳(상세이동)으로 새지 않도록 막는 함수
    const handleBtnClick = (e: React.MouseEvent, action: string) => {
      e.preventDefault();  // 🟢 기본 동작 방지 추가
      e.stopPropagation(); // 🟢 부모 요소(상세페이지 이동)로 전파 차단
      onAction(action, item);
    };

    // [Host: 방장]
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
      if (status === 'open' || status === 'recruiting') {
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
            disabled={!['paid', 'delivered', 'shared', 'completed'].includes(status)}
            onClick={(e) => handleBtnClick(e, 'VIEW_PAYMENT')}
          >
            결제정보 확인
          </button>

          <button
            className="btn btn-outline-success btn-sm"
            disabled={!['delivered', 'shared', 'completed'].includes(status)}
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

  // ✅ 상태 메시지
  const renderStatusMessage = () => {
    if (isHost && (status === 'shared' || status === 'completed')) {
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

        {/* 🟢 [왼쪽] 상세페이지 이동 영역 
            - zIndex: 1로 설정하여 버튼(zIndex: 50)보다 아래에 위치하도록 강제함
        */}
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

        {/* 🟢 [오른쪽] 액션 버튼들 (z-index: 50) */}
        {renderActionBtn()}
      </div>
    </div>
  );
};