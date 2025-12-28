import type { SpicyLevelPercentages } from "../services/data/RecipeData";

import "@/features/recipe/styles/spicyStats.css";

interface SpicyStatsProps {
    percentages: SpicyLevelPercentages[];
    reviewCount: number;
}

export default function SpicyStats({
    percentages,
    reviewCount
}: SpicyStatsProps) {
  return (
    <section className="bg-light p-3 rounded-3 mb-4">
      <h6 className="fw-bold mb-3">다른 회원의 매운맛 평가 ({reviewCount})</h6>

      {Object.entries(percentages).map(([level, percent]) => (
        <div key={level} className="d-flex align-items-center mb-1">
          <span style={{ width: 50 }}>{level}단계</span>
          <div className="progress flex-fill mx-2">
            <div
              className="progress-bar"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span>{percent}%</span>
        </div>
      ))}
    </section>
  );
}
