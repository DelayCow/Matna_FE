import { useNavigate } from "react-router-dom";
import "../styles/groupBuyCard.css";

export interface QuantityGroupBuy{
    quantityGroupBuyNo: number;
    groupBuyImageUrl: string;
    title: string;
    creatorImageUrl?: string;
    nickname: string;
    remainingQty: number;
    quantity: number;
    unit: string;
    pricePerUnit: number;
    shareAmount: number;
    shareLocation: string;
}

interface QuantityGroupBuyProps {
    data: QuantityGroupBuy;
    onClick?: (no: number) => void;
}

export default function QuantityGroupBuyCard({data}: QuantityGroupBuyProps){
    const navigate = useNavigate();
    const creatorImageUrl = data.creatorImageUrl || '../src/assets/user.png';
    const formatAddress = (fullAddress: string): string =>{
        if(!fullAddress) return '주소 정보 없음';

        const addressParts = fullAddress.split(' ');
        const district = addressParts.find(part => part.endsWith('구'));

        if(district) {
            return district;
        }
        return addressParts.length > 1 ? addressParts[1]: '주소 오류';
    };
    const address = formatAddress(data.shareLocation);

    const handleClick = () => {
        navigate(`/quantityGroupBuy/detail/${data.quantityGroupBuyNo}`);
    };

    return(
        <div className="card card-custom card-wide" datatype="quantityGroupBuy" data-no={data.quantityGroupBuyNo} 
            onClick={handleClick} style={{cursor: 'pointer'}}>
        <img src={data.groupBuyImageUrl} className="card-img-top" alt={data.title} />
        <div className="card-body px-0 py-2">
            <div className="d-flex align-items-center mb-1">
                <img src={creatorImageUrl} className="profile-img" alt="User" />
                <div className="overflow-hidden w-100">
                    <div className="d-flex overflow-hidden w-100">
                        <small className="fw-bold text-nowrap">{data.nickname}</small>
                        <p className="card-text text-truncate mb-0 ms-2">{data.title}</p>
                    </div>
                    <small className="text-danger d-block mb-1">
                        남은 수량 : {data.remainingQty}{data.unit} / {data.quantity}{data.unit}
                    </small>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <span className="fw-bold">{data.pricePerUnit?.toLocaleString()}원</span>
                    <small className="text-muted">
                        ({data.shareAmount}{data.unit}당)
                    </small>
                </div>
                <span className="badge badge-location">{address}</span>
            </div>
        </div>
        </div>

    );
}