
import React from "react";

const FButton = ({ 
  type = "button", 
  loading = false, 
  text = "Submit", 
  variant = "primary", 
  onClick 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} w-100`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Generating Plan..." : text}
    </button>
  );
};

export default FButton;
