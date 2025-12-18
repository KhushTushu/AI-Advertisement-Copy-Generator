
import { GoogleGenAI, Type } from "@google/genai";
import { AdVariation, GeneratorConfig } from "../types";

export const generateAdCopy = async (config: GeneratorConfig): Promise<AdVariation[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    You are a senior conversion-focused copywriter. 
    Generate 4 distinct, high-performing advertisement copy variations for the following product:
    
    Product: ${config.productName}
    Description: ${config.description}
    Target Audience: ${config.audience}
    Tone: ${config.tone}
    Goal: ${config.goal}

    Each variation must be optimized for a specific platform (Meta, Google, TikTok, LinkedIn) and follow best practices for high conversion.
    Include specific headlines, persuasive body text, and powerful CTAs.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            platform: { type: Type.STRING },
            headline: { type: Type.STRING },
            body: { type: Type.STRING },
            cta: { type: Type.STRING },
            persuasionPoints: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
          },
          required: ["id", "platform", "headline", "body", "cta", "persuasionPoints"],
        },
      },
    },
  });

  try {
    const jsonStr = response.text || '[]';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return [];
  }
};
