export function getDifficultyText(difficulty: string) {
  switch (difficulty) {
    case "easy":
      return "쉬움";
    case "normal":
      return "보통";
    default:
      return "어려움";
  }
}