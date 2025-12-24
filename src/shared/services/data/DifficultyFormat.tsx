

export const DifficultyFormat = (difficulty: string) => {
    const difficultyMap: {[key : string]: string } = {
        'easy': '쉬움',
        'normal': '보통',
        'hard': '어려움',
        
    };
    return difficultyMap[difficulty] || difficulty;
};