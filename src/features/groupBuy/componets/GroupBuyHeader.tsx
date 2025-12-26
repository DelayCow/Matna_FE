import { useNavigate } from "react-router-dom";
import "..groupBuyHeader.css";

interface GroupBuyHeadeerProps {
    imageUrl: string;
    title: string;
    authorNickname: string;
    authorProfileUrl?: string;
    authorNo: number;
    itemSaleUrl?: string;
}

export default function GroupBuyHeader({imageUrl, title, authorNickname, authorProfileUrl, authorNo, itemSaleUrl}: GroupBuyHeadeerProps){
    const navigate = useNavigate();
    const handleAutorClick = () => {
        navigate(`/mypage/${authorNo}`);
    };
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, type: 'product' | 'profile') => {
        if (type === 'product') {
            e.currentTarget.src = 'https://placehold.co/150x100/A0B2C9/ffffff?text=Product';
        } else {
            e.currentTarget.src = '/assets/user.png'
        }
    };

    return(
        <>
            <div className="top-product-image-full">
                <img src={imageUrl} alt={title} className="img-fluid" onError={(e) => handleImageError(e, 'product')} />
            </div>

            <div className="group-buy-product p-3">
                <div onClick={handleAutorClick} style={{ textDecoration:'none', color:'inherit', cursor:'pointer' }}>
                    <div className="d-flex align-items-center">
                        <img src={authorProfileUrl} className="rounded-circle me-2" alt="작성자 프로필" style={{width:'36px', height:'36px'}} onError={(e) => handleImageError(e, 'profile')} />
                        <div className="d-flex flex-column lh-sm">
                            <span className="fw-bold">{authorNickname}</span>
                        </div>
                    </div>
                </div>

                <h2 className="fw-bold mb-1 product-title">{title}</h2>

                {itemSaleUrl && (
                    <a href={itemSaleUrl} target="_blank" className="text-primary small d-inline-block text-decoration-none mb-3">
                        상품판매페이지
                    </a>
                )}
            </div>
        </>
    );
}