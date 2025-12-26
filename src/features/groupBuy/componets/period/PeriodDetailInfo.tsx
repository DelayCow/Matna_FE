import DueDateCountDown from "@/shared/components/DueDateCountDown";
import PeriodPriceTable from "./PeriodPriceTable";

interface PeriodDetailInfoProps {
    price: number;
    feeRate: number;
    maxParticipants: number;
    currentParticipants: number;
    dueDate: string;
    quantity: number;
    unit: string;

    userStatus: 'normal' | 'participant' | 'creator';
    isActionLoading: boolean;
    onButtonClick: () => void;
}

export default function PeriodDetailInfo({price, feeRate, maxParticipants, currentParticipants, dueDate, quantity, unit,
                                        userStatus, isActionLoading, onButtonClick}: PeriodDetailInfoProps){
    
    const totalWithFee = price * (1 + feeRate / 100);
    const minPrice = Math.round(totalWithFee / maxParticipants);
    const maxPrice = Math.round(totalWithFee / 2);

    const estimatePrice = (() => {
        if (currentParticipants > 0){
            const pricePerUnit = (totalWithFee / quantity).toFixed(1);
            return `( 1${unit} 당 ${parseFloat(pricePerUnit).toLocaleString()}원 )`;
        } else {
            return `( 1${unit} 당 ${maxPrice.toLocaleString()}원 )`;
        }
    })();

    const getButtonText = () => {
        switch(userStatus) {
            case 'normal':
                return '공동구매 참여하기';
            case 'participant':
                return '공동구매 취소하기';
            case 'creator':
                return '공동구매 중단하기';
            default:
                return '공동구매 참여하기';
        }
    };

    return(
        <>
            <p className="product-price fs-4 fw-bold mb-1">
                <span>{minPrice.toLocaleString()}</span>원 ~ <span>{maxPrice.toLocaleString()}</span>원 
                <span className="text-muted fee-text">(수수료 {feeRate.toFixed(0)}% 포함)</span>
            </p>

            <hr className="my-3" />

            <div className="product-status-block">
                <div className="d-flex align-items-center mb-1">
                    <span className="text-dark me-2 fw-bold">참여 인원</span>
                    <span className="fs-5 fw-bold text-danger me-1">{currentParticipants + 1}</span> /
                    <span className="text-muted">{maxParticipants}</span>
                </div>
                <div className="text-start mb-2">
                    <DueDateCountDown dueDate={dueDate} layout="detail"/>
                </div>
            </div>

            <p className="mb-2 fw-bold small">
                참여 인원별 예상 금액
                <span className="text-danger ms-1">{estimatePrice}</span>
            </p>

            <div className="d-flex align-items-end justify-content-between mb-3 table-button-group">
                <div className="table-responsive small flex-grow-1 me-2" style={{ maxWidth: '300px' }}>
                    <PeriodPriceTable
                        maxParticipants={maxParticipants}
                        price={price}
                        feeRate={feeRate}
                        quantity={quantity}
                        unit={unit}
                    />
                </div>
                <div className="d-flex flex-shrink-0">
                    <button
                        className="btn btn-danger py-2 px-3 fw-bold"
                        onClick={onButtonClick}
                        disabled={isActionLoading}
                    >
                        {isActionLoading && (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                        )}
                        {getButtonText()}
                    </button>
                </div>
            </div>
        </>
    );
}