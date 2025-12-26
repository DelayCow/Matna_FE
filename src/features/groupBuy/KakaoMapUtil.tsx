export const openKakaoMap = (address: string): void => {
    if (!address || !address.trim()) {
        alert('주소 정보가 없습니다.');
        return;
    }

    // 카카오맵 검색 URL (주소로 검색)
    const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;

    window.open(kakaoMapUrl, '_blank', 'width=900,height=700');
};