import "@/shared/styles/card.css"
import { DateFormat } from "@/shared/services/data/DateFormat";
import defaultProfile from "@/assets/user.png";

export interface ReviewCardProps {
    reviewNo: number,
    reviewImage: string,
    writerProfileImage?: string,
    writerNickname: string,
    title: string,
    rating: number,
    inDate: Date,
    onClickDetail: (reviewNo: number) => void; 
}

export const ReviewCard = ({
    reviewNo,
    reviewImage,
    writerProfileImage,
    writerNickname,
    title,
    rating,
    inDate,
    onClickDetail
}: ReviewCardProps) => {


    const displayProfile = writerProfileImage || defaultProfile;

    return (
        <div 
      className="card card-custom card-wide" 
      onClick={() => onClickDetail(reviewNo)}
      style={{ cursor: 'pointer' }} 
    >
      <img src={reviewImage} className="card-img-top" alt="Review" />
      
      <div className="card-body px-0 py-2">
        <div className="d-flex align-items-center mb-1">
          
          <img src={displayProfile} className="profile-img" alt="User" />
          
          <div className="overflow-hidden w-100">
            <div className="d-flex overflow-hidden w-100">
              <small className="fw-bold text-nowrap">{writerNickname}</small>
              <p className="card-text text-truncate mb-0 ms-2">{title}</p>
            </div>
            
            <div className="small text-muted">
              <span className="text-warning">
                <i className="bi bi-star-fill"></i> {rating}
              </span>
              <span className="ms-2">작성일 : {DateFormat(inDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

