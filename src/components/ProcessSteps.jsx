import './ProcessSteps.css';

export default function ProcessSteps({ steps }) {
  return (
    <div className="process-steps" id="process-steps">
      {steps.map((step, i) => (
        <div key={i} className="process-step">
          <div className="process-step__number">{i + 1}</div>
          <h3 className="process-step__title">{step.title}</h3>
          <p className="process-step__desc">{step.description}</p>
          {step.details && step.details.length > 0 && (
            <div className="process-step__details">
              {step.details.map((detail, j) => (
                <p key={j} className="process-step__detail-item">{detail}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
