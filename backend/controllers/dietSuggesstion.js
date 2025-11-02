const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const fitnessPlanService = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      height,
      weight,
      fitnessGoal,
      fitnessLevel,
      workoutLocation,
      dietaryPreference,
      medicalHistory,
      stressLevel,
    } = req.body;

    // ✅ Validate required fields
    if (!age || !gender || !fitnessGoal || !dietaryPreference) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🧠 AI Prompt: request diet, workout & motivation plan
    const prompt = `
You are a certified fitness coach and nutritionist.
Generate a **personalized 1-day plan** for the following person:

Name: ${name || "User"}
Age: ${age}
Gender: ${gender}
Height: ${height || "Not provided"} cm
Weight: ${weight || "Not provided"} kg
Fitness Goal: ${fitnessGoal}
Current Fitness Level: ${fitnessLevel || "Not provided"}
Workout Location: ${workoutLocation || "Not provided"}
Dietary Preference: ${dietaryPreference}
Medical History: ${medicalHistory || "None"}
Stress Level: ${stressLevel || "Not provided"}

Provide three sections in your response:

1️⃣ **🏋️ Workout Plan**  
   - Include warm-up, main workout, and cooldown.  
   - Mention sets, reps, rest time, and focus areas.  
   - Adjust intensity based on fitness level and location.

2️⃣ **🥗 Diet Plan**  
   - Include meals for Breakfast, Lunch, Dinner, and Snacks.  
   - Ensure portions align with the fitness goal and dietary preference.  
   - Keep it practical and easy to follow.

3️⃣ **💬 AI Tips & Motivation**  
   - Add 2-3 motivational lines and 2 lifestyle tips (hydration, posture, rest, etc).

Keep the response well-formatted, easy to read, and in clear bullet points.
`;

    // ⚙️ Generate content using Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // or gemini-1.5-pro if available
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const resultText =
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    // ✅ Respond with full structured plan
    res.status(200).json({
      message: "AI-powered fitness plan generated successfully",
      plan: resultText,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { fitnessPlanService };
