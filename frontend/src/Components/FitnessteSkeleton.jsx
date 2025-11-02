import React from "react";

const quotes = [
  "🏋️‍♂️ Every rep counts — progress, not perfection!",
  "🥗 You don’t have to be extreme, just consistent.",
  "🔥 Push yourself, because no one else is going to do it for you.",
  "💧 Stay hydrated, stay strong, stay focused.",
  "🧠 Train your mind — your body will follow.",
  "🌞 One workout at a time. One meal at a time.",
  "🚀 Discipline beats motivation every single time.",
];

const FitnessteSkeleton = () => {

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center p-5 bg-light border rounded shadow-sm mt-4">
      <div className="spinner-border text-primary mb-3" role="status"></div>
      <h5 className="fw-bold text-dark">{randomQuote}</h5>
      <p className="text-muted mt-2">Generating your personalized AI plan... 💪</p>
    </div>
  );
};

export default FitnessteSkeleton;
