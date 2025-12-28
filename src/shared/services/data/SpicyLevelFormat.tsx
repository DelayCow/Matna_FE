
export const SpicyLevelFormat = (level: number): string => {
    const spicyMap: {[key: number]: string } = {
        0: '안매워요',
        1: '약간매워요',
        2: '신라면맵기',
        3: '열라면맵기',
        4: '불닭맵기',
        5: '불닭보다매워요',
    };
    return spicyMap[level] || '';
};