import { openKakaoMap } from '../KakaoMapUtil';

interface ShareLocationProps {
    shareLocation: string;
    shareDetailAddress?: string;
    buyDate: string;
    shareDate: string;
}

export default function ShareLocation({shareLocation, shareDetailAddress, buyDate, shareDate}: ShareLocationProps){

    const handleMapClick = () => {
        openKakaoMap(shareLocation);
    };

    return(
        <>
            <hr className="my-3" />

            <div className="group-buy-location mb-3">
                <h5 className="fw-bold mb-2">나눔 장소</h5>
                <p className="mb-1">
                    <span id="data-share-location">
                        {shareLocation || '장소 정보 없음'}
                    </span>
                    {shareDetailAddress && (
                        <span id="data-share-address"> {shareDetailAddress}</span>
                    )}
                    {shareLocation && (
                        <i 
                            className="bi bi-geo-alt-fill ms-2 text-danger" 
                            id="address-map"
                            style={{ cursor: 'pointer' }}
                            onClick={handleMapClick}
                            title="카카오맵에서 보기"
                        />
                    )}
                </p>
            </div>

            <div className="group-buy-dates mb-3 small">
                <p className="mb-1">
                    <span className="fw-bold me-2">상품 구매 일시:</span>
                    <span id="data-buy-date">{buyDate || '정보 없음'}</span>
                </p>
                <p className="mb-0">
                    <span className="fw-bold me-2">상품 나눔 일시:</span>
                    <span id="data-share-date">{shareDate || '정보 없음'}</span>
                </p>
            </div>
        </>
    );
}