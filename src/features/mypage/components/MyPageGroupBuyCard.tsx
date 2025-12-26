
import "@/features/mypage/styles/mypage.css";


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
  step: number;
}

interface MyPageGroupBuyCardProps {
  item: GroupBuyItem;
  step: number;
  isHost: boolean;
  onAction: (action: string, item: GroupBuyItem) => void;
}

export const MyPageGroupBuyCard = ({ item, step, isHost, onAction }: MyPageGroupBuyCardProps) => {
  const steps = ["모집", "상품결제", "상품도착", "나눔진행"];


  const renderActionBtn = () => {
    // 🛠️ 변경 포인트: 인터페이스 덕분에 타입 변환 없이 바로 접근 가능
    const s = (item.status || "").trim().toUpperCase();
    
    if (item.receiveDate) return <button className="btn btn-secondary btn-sm" disabled>수령 완료</button>;
    
    if ((s === 'OPEN' || s === 'RECRUITING') && !isHost) 
      return <button className="btn btn-outline-danger btn-sm" onClick={() => onAction('CANCEL', item)}>참여 취소</button>;
    if (s === 'CLOSED' && isHost) 
      return <button className="btn btn-danger btn-sm" onClick={() => onAction('REG_PAYMENT', item)}>결제정보 등록</button>;
    if (s === 'PAID') 
      return <button className="btn btn-outline-primary btn-sm" onClick={() => onAction('VIEW_PAYMENT', item)}>결제정보 확인</button>;
    if (s === 'DELIVERED') 
      return <button className="btn btn-success btn-sm" onClick={() => onAction('VIEW_ARRIVAL', item)}>도착정보 확인</button>;
    if (s === 'SHARED' || s === 'COMPLETED') 
      return <button className="btn btn-success btn-sm" onClick={() => onAction('CONFIRM_SHARE', item)}>나눔 받았어요!</button>;
    
    return null;
  };

  return (
    <div className="group-card mb-3 p-3 border rounded bg-white shadow-sm">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="flex-grow-1 me-3">
          <div className="timeline-steps">
            {steps.map((stepName, index) => {
              const stepNum = index + 1;
              // mypage.css에 정의된 .active, .current 클래스가 여기서 불을 켭니다.
              let activeClass = (stepNum < step) ? "active" : (stepNum === step ? "current" : "");
              
              return (
                <div key={stepName} className={`step-item ${activeClass}`}>
                  <div className="step-circle"></div>
                  <span className="step-text">{stepName}</span>
                </div>
              );
            })}
          </div>
        </div>
        {renderActionBtn()}
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="rounded overflow-hidden border" style={{ width: '80px', height: '80px' }}>
          <img 
            src={item.imageUrl || '/img/default_food.jpg'} 
            className="w-100 h-100 object-fit-cover" 
            alt={item.title} 
          />
        </div>
        <div className="group-info flex-grow-1">
          <h5 className="fw-bold mb-1" style={{ fontSize: '1rem' }}>{item.title}</h5>
        </div>
      </div>
    </div>
  );
};