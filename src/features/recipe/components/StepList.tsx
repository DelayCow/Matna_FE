import type { RecipeStep } from "../services/data/RecipeData";

import "@/features/recipe/styles/stepList.css";

interface StepListProps {
  steps: RecipeStep[];
}

export default function StepList({
  steps
}: StepListProps) {
  return (
    <section className="mb-5 px-3">
      <h5 className="fw-bold border-bottom pb-2 mb-3">
        조리 순서
      </h5>
      {steps.map((step) => (
        <div
          key={step.stepOrder}
          className="d-flex mb-3 step-item"
        >
          <strong className="me-2 step-number">
            {step.stepOrder}.
          </strong>

          <div className="step-img">
            <img
              src={step.imageUrl}
              alt={`step-${step.stepOrder}`}
              className="img-fluid mb-2"
            />
          </div>
          <p>{step.content}</p>
        </div>
        
        
      ))}
    </section>
  );
}
