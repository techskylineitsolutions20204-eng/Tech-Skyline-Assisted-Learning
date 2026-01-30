
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Type } from '@google/genai';
import { CareerRoadmap } from '../types';

export class RoadmapError extends Error {
  constructor(public message: string, public code?: string) {
    super(message);
    this.name = 'RoadmapError';
  }
}

export const generateLearningPath = async (
  goal: string,
  currentExperience: string
): Promise<CareerRoadmap> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Generate a professional, high-fidelity assisted self-learning career roadmap for: "${goal}".
    User's current experience level: "${currentExperience}".
    
    Adhere to the Tech Skyline IT Solutions (2026-2030) framework:
    - Foundational (Now–2027)
    - Growth (2027–2029)
    - Future Frontier (2028–2030)
    
    You MUST prioritize recommending these specific "Full Permission" industry-standard labs and platforms to ensure the user has "Zero-Downtime" access to live environments:

    1. GOOGLE ECOSYSTEM (CLOUD & CYBERSECURITY):
       - Google Cloud Skills Boost (Formerly Qwiklabs): Use for REAL GCP projects, IAM hardening, VPC security, GKE, and Chronicle SIEM basics.
       - Google Cloud Shell: For permanent Linux terminal access and security automation (gcloud, kubectl, terraform).
       - Google Cloud Free Tier: For permanent free account resources (IAM, VPC, Logging).
       - Google Cybersecurity Professional Certificate (Coursera): For SOC fundamentals and IR.

    2. CYBERSECURITY & RISK MANAGEMENT:
       - TryHackMe: Highly recommended for Cloud & SOC Paths (AWS/Azure attack simulation).
       - Hack The Box Academy: For realistic enterprise cloud breaches and Kubernetes security.
       - PortSwigger Academy: For deep Web Security (Burp Suite).
       - SANS CyberAces & OpenSecurityTraining.info: For fundamental and advanced risk management.
       - Splunk Free Labs & Elastic Security: For live log analysis and threat hunting.

    3. NETWORKING & INFRASTRUCTURE:
       - Cisco NetAcad & Packet Tracer: For foundational network security.
       - GNS3 & EVE-NG: For advanced multi-vendor emulation.

    For each learning step, provide:
    - Detailed title, description, and time commitment.
    - Specific technical skills (e.g., "GCP IAM Role Audit", "Kubernetes Pod Security Policy").
    - Prerequisites and relevant certifications.

    In the "labs" section, include at least 5 highly relevant labs. Ensure the "platform" name matches exactly one of the keys above (e.g., 'Google Cloud Skills Boost', 'TryHackMe', 'Splunk') so the app can correctly route the user.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            goal: { type: Type.STRING },
            summary: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                  timeline: { type: Type.STRING, enum: ['Foundational', 'Growth', 'Future Frontier'] },
                  timeCommitment: { type: Type.STRING },
                  prerequisites: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['title', 'description', 'skills', 'timeline', 'timeCommitment', 'prerequisites']
              }
            },
            labs: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  platform: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ['name', 'platform', 'description']
              } 
            }
          },
          required: ['goal', 'summary', 'steps', 'labs']
        }
      }
    });

    if (!response.text) {
      throw new RoadmapError("The AI service returned an empty response.", "EMPTY_RESPONSE");
    }

    try {
      const data = JSON.parse(response.text);
      return data as CareerRoadmap;
    } catch (parseError) {
      throw new RoadmapError("Failed to parse roadmap data.", "PARSE_ERROR");
    }

  } catch (err: any) {
    if (err instanceof RoadmapError) throw err;
    throw new RoadmapError(
      err?.message || "Connectivity issue with the roadmap engine.",
      "API_ERROR"
    );
  }
};
