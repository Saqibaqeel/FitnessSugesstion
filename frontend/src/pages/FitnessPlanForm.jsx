import React, { useState } from "react";
import axios from "axios";
import AIPlanOutput from "../Components/AIPlanOutput";
import FButton from "../Components/FButton";
import FitnessteSkeleton from "../Components/FitnessteSkeleton";

const FitnessPlanForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitnessGoal: "",
    fitnessLevel: "",
    workoutLocation: "",
    dietaryPreference: "",
    medicalHistory: "",
    stressLevel: "",
  });

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/diet/diet-suggestion", formData);
      setPlan(res.data.dietPlan || res.data.plan || "No plan generated");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  const handleBack = () => {
    setPlan("");
  };

  // Show AI output if plan exists
  if (plan) return <AIPlanOutput plan={plan} onBack={handleBack} />;

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4 fw-bold">
        <i className="fas fa-dumbbell text-primary me-2"></i>AI Fitness & Diet Plan Generator
      </h2>

      <form onSubmit={handleSubmit} className="border rounded p-4 shadow-sm bg-light position-relative">
        {/* Skeleton Loader */}
        {loading && (
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-light bg-opacity-75 d-flex align-items-center justify-content-center">
            <FitnessteSkeleton />
          </div>
        )}

        {/* Input Fields */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Height (cm)</label>
            <input
              type="number"
              name="height"
              className="form-control"
              value={formData.height}
              onChange={handleChange}
              placeholder="e.g. 170"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              className="form-control"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g. 65"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Fitness Goal</label>
            <select
              name="fitnessGoal"
              className="form-select"
              value={formData.fitnessGoal}
              onChange={handleChange}
            >
              <option value="">Select goal</option>
              <option>Weight Loss</option>
              <option>Muscle Gain</option>
              <option>Maintain Fitness</option>
              <option>Endurance</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Fitness Level</label>
            <select
              name="fitnessLevel"
              className="form-select"
              value={formData.fitnessLevel}
              onChange={handleChange}
            >
              <option value="">Select level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Workout Location</label>
            <select
              name="workoutLocation"
              className="form-select"
              value={formData.workoutLocation}
              onChange={handleChange}
            >
              <option value="">Select location</option>
              <option>Home</option>
              <option>Gym</option>
              <option>Outdoor</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Dietary Preference</label>
            <select
              name="dietaryPreference"
              className="form-select"
              value={formData.dietaryPreference}
              onChange={handleChange}
            >
              <option value="">Select preference</option>
              <option>Veg</option>
              <option>Non-Veg</option>
              <option>Vegan</option>
              <option>Keto</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Medical History</label>
          <input
            type="text"
            name="medicalHistory"
            className="form-control"
            value={formData.medicalHistory}
            onChange={handleChange}
            placeholder="Any past medical conditions (optional)"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Stress Level</label>
          <input
            type="text"
            name="stressLevel"
            className="form-control"
            value={formData.stressLevel}
            onChange={handleChange}
            placeholder="Low / Moderate / High (optional)"
          />
        </div>

        <FButton type="submit" loading={loading} text="Generate AI Plan" variant="primary" />
      </form>
    </div>
  );
};

export default FitnessPlanForm;
