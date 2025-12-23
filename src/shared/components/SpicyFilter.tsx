import { useState } from "react";
import "../styles/spicyFilter.css";
import spicyIcon from "../../assets/spicy.png";

interface SpicyFilterProps {
    levelChange: (level: number | null) => void;
}

const SPICY_LEVELS = [
    { level: 0, text: "안매워요" },
    { level: 1, text: "약간매워요" },
    { level: 2, text: "신라면맵기" },
    { level: 3, text: "열라면맵기" },
    { level: 4, text: "불닭맵기" },
    { level: 5, text: "불닭보다매워요" },
];

export default function SpicyFilter({ levelChange }: SpicyFilterProps){
    const [activeLevel, setActiveLevel] = useState<number | null>(null);

    const handleIconClick = (level: number) => {
        const newLevel = activeLevel === level ? null : level;
        setActiveLevel(newLevel);
        levelChange(newLevel);
    };

    const renderSpicyIcons = (level: number) => {
        if (level === 0) return <span className="no-spicy-text">안매워요</span>;
        const imgs = [];
        for (let i = 0; i < level; i++) {
            imgs.push(
                <img key={i} src={spicyIcon} alt="고추" />
            );
        }
        return imgs;
    };

    return (
        <div className="spicy-filter-container d-flex flex-row mb-3">
            {SPICY_LEVELS.map((item) => (
                <div 
                    key={item.level}
                    className={`spicy-level-icon ${activeLevel === item.level ? 'active' : ''}`}
                    onClick={() => handleIconClick(item.level)}
                >
                    <div className="icon-container">
                        {renderSpicyIcons(item.level)}
                    </div>
                    {item.level !== 0 && (
                        <span className="spicy-text">{item.text}</span>
                    )}
                </div>
            ))}
        </div>
    );
}