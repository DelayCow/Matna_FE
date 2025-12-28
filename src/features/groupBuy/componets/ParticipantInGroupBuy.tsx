import { useNavigate } from "react-router-dom";

export interface Participants {
    participantNo: number;
    participatedDate?: string;
    profileUrl?: string;
    nickname?: string;
    memberNo?: number;
    myQuantity?: number; //수량공구용
}

interface GroupBuyParticipantProps {
    participants: Participants[];
    type: 'period' | 'quantity';
    unit?: string;
}

export default function ParticipantInGroupBuy({participants, type, unit}: GroupBuyParticipantProps){
    const navigate = useNavigate();
    const participantCount = participants ? participants.length : 0;

    const handleProfileClick = (memberNo?: number) => {
        if (!memberNo) return;
        navigate(`/mypage/${memberNo}`);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = '';
    };

    return(
        <>
            <hr className="m-0" style={{height: '8px', backgroundColor: '#f8f9fa'}} />

            <div className="participants-list p-3">
                <h5 className="fw-bold mb-3">
                    참여자 <span>{participantCount}</span>명
                </h5>
                <div>
                    {participants && participants.length > 0 ? (
                        participants.map((participant) => {
                            const profileUrl = participant.profileUrl || "@/assets/user.png";
                            const date = formatDate(participant.participatedDate);

                            return (
                                <div key={participant.participantNo} className="d-flex align-items-center mb-3" onClick={() => handleProfileClick(participant.memberNo)} style={{ cursor: 'pointer' }}>
                                        <img src={profileUrl} className="rounded-circle me-3" alt="참여자 프로필" style={{width:'50px', height:'50px'}} onError={handleImageError}/>

                                    {type === 'period' && (
                                        <div className="d-flex flex-column">
                                            <span className="fw-bold fs-6">{participant.nickname}</span>
                                            <span className="small text-muted">{date}</span>
                                        </div>
                                    )}
                                    {type === 'quantity' && (
                                        <>
                                            <div className="d-flex flex-column flex-grow-1">
                                                <span className="fw-bold fs-6">{participant.nickname}</span>
                                                <span className="small text-muted">{date}</span>
                                            </div>
                                            <span className="fw-bold text-danger">
                                                {participant.myQuantity}{unit}
                                            </span>
                                        </>
                                    )}
                                    
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-muted small">아직 참여자가 없습니다.</p>
                    )}
                </div>
            </div>
        </>
    );
}