import { useNavigate } from "react-router-dom";
import DueDateCountDown from "./DueDateCountDown";
import "../styles/groupBuyCard.css";

interface PeriodGroupBuy {
    periodGroupBuyNo: number;
    groupBuyImageUrl: string;
    title: string;
    creatorImageUrl?: string;
    nickname: string;
    dueDate: string;
    minPricePerPerson: number;
    maxPricePerPerson: number;
    participants: number;
    maxParticipants: number;
    shareLocation: string;
}

interface PeriodGroupBuyCardProps{
    data: PeriodGroupBuy;
}

export default function PeriodGroupBuyCard({data}: PeriodGroupBuyCardProps){    
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
        navigate(`/periodGroupBuy/detail/${data.periodGroupBuyNo}`);
    };
    return(
        <div className="card card-custom card-wide" data-type="periodGroupBuy" data-no={data.periodGroupBuyNo}
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
                    <DueDateCountDown dueDate={data.dueDate} />
                </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{data.minPricePerPerson?.toLocaleString()}~{data.maxPricePerPerson?.toLocaleString()}원
                        <small className="text-muted fw-normal">
                            (<span className="text-danger">{data.participants}</span>/{data.maxParticipants})
                        </small>
                    </span>
                    <span className="badge badge-location">{address}</span>
                </div>
            </div>
        </div>
    );
}