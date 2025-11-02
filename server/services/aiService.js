const { GoogleGenerativeAI } = require('@google/generative-ai');
const { AyurvedicDoctor } = require('./ayurvedicDoctorModel');

// Initialize Gemini AI (you'll need to set GEMINI_API_KEY in .env)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'your-api-key-here');

// Initialize Ayurvedic Doctor AI model
const ayurvedicDoctor = new AyurvedicDoctor();

// Analyze uploaded report
async function analyzeReport(fileBuffer, fileName, fileType) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Analyze this medical report and provide Ayurvedic insights.
      Provide:
      1. Key findings from the report
      2. Ayurvedic diagnosis based on doshas
      3. Herbal remedies and recommendations
      4. Dietary suggestions
      
      Format the response as JSON with structure:
      {
        "findings": ["finding1", "finding2"],
        "ayurvedicDiagnosis": "diagnosis text",
        "recommendations": ["rec1", "rec2"],
        "remedies": [
          {
            "herb": "herb name",
            "dosage": "dosage info",
            "duration": "duration info",
            "reason": "why this herb helps"
          }
        ]
      }
      
      Important: Return ONLY valid JSON, no other text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response (handle markdown code blocks if present)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/, '').replace(/```\n?/, '').trim();
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/, '').replace(/```\n?/, '').trim();
    }
    
    const analysis = JSON.parse(jsonText);
    return analysis;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    // Return default response if AI fails
    return {
      findings: ["Report uploaded successfully"],
      ayurvedicDiagnosis: "Analysis pending. Please consult with an Ayurvedic physician.",
      recommendations: ["Maintain a balanced diet", "Follow Dinacharya (daily routine)", "Practice yoga and meditation"],
      remedies: []
    };
  }
}

// Generate personalized Ayurvedic plan using V5 Gold Standard Model
async function generatePersonalizedPlan(userData) {
  try {
    // Use the Ayurvedic Doctor V5 model instead of Gemini
    const plan = ayurvedicDoctor.generatePersonalizedPlan(userData);
    return plan;
  } catch (error) {
    console.error('AI Plan Generation Error:', error);
    // Return default plan structure if model fails
    const { diseases, prakritiType } = userData;
    return getDefaultPlan(diseases, prakritiType);
  }
}

// Chat with AI assistant
async function chatWithAI(message, userContext, conversationContext = []) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const systemPrompt = `
      You are a knowledgeable Ayurvedic personal assistant for VedaVerse app.
      User Context:
      - Prakriti Type: ${userContext.prakritiType || 'Not determined'}
      - Stress Level: ${userContext.stressLevel || 'Moderate'}
      - Dietary Preferences: ${userContext.dietaryPreferences?.join(', ') || 'None'}
      - Conditions: ${userContext.selectedDiseases?.join(', ') || 'None'}
      
      Provide helpful, accurate Ayurvedic advice. Be friendly, supportive, and educational.
      Keep responses concise but informative (max 500 words). Always base advice on traditional Ayurvedic principles.
    `;

    // Build conversation history
    let fullPrompt = systemPrompt + '\n\nConversation History:\n';
    conversationContext.forEach((msg, idx) => {
      if (msg.role === 'user') {
        fullPrompt += `User: ${msg.content}\n`;
      } else if (msg.role === 'assistant') {
        fullPrompt += `Assistant: ${msg.content}\n`;
      }
    });
    
    fullPrompt += `\nCurrent Question:\nUser: ${message}\nAssistant:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI Chat Error:', error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
}

// Default plan structure if AI fails
function getDefaultPlan(diseases, prakritiType) {
  return {
    yogaPoses: [
      {
        name: "Tadasana",
        sanskritName: "Mountain Pose",
        description: "Foundation for all standing poses",
        instructions: ["Stand straight", "Feet together", "Arms at sides", "Breathe deeply"],
        benefits: ["Improves posture", "Increases awareness"],
        whyAyurvedic: "Balances all three doshas and improves body alignment",
        duration: "2-5 minutes"
      }
    ],
    dietPlan: {
      foodsToEat: [
        { name: "Fresh fruits", reason: "Natural and easy to digest", timing: "Morning" },
        { name: "Vegetables", reason: "Provide essential nutrients", timing: "Lunch and dinner" }
      ],
      foodsToAvoid: [
        { name: "Processed foods", reason: "Difficult to digest and create toxins" }
      ],
      mealSchedule: [
        { meal: "Breakfast", time: "7-9 AM", suggestions: ["Light and nutritious"] },
        { meal: "Lunch", time: "12-1 PM", suggestions: ["Main meal of the day"] },
        { meal: "Dinner", time: "6-7 PM", suggestions: ["Light and early"] }
      ]
    },
    lifestyleTips: [
      { tip: "Wake up early (before sunrise)", reason: "Aligned with natural circadian rhythm", category: "Daily Routine" },
      { tip: "Practice meditation daily", reason: "Calms the mind and balances doshas", category: "Mental Health" }
    ],
    dosAndDonts: {
      dos: [
        { action: "Follow Dinacharya (daily routine)", reason: "Maintains doshic balance" },
        { action: "Exercise regularly", reason: "Improves circulation and digestion" }
      ],
      donts: [
        { action: "Eat late at night", reason: "Disrupts digestion and sleep" },
        { action: "Skip meals", reason: "Causes doshic imbalance" }
      ]
    },
    herbalRecommendations: [
      {
        herbName: "Tulsi",
        benefits: ["Boosts immunity", "Reduces stress"],
        usage: "1-2 teaspoons in warm water",
        precautions: "Consult if pregnant"
      }
    ]
  };
}

module.exports = {
  analyzeReport,
  generatePersonalizedPlan,
  chatWithAI
};
