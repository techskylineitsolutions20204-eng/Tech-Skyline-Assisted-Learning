
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
    Generate a comprehensive assisted self-learning career roadmap for the following goal: "${goal}".
    User's current experience: "${currentExperience}".
    
    The roadmap must align with Tech Skyline IT Solutions' framework (2026-2030):
    - Foundational (Now–2027)
    - Growth (2027–2029)
    - Future Frontier (2028–2030)
    
    For each learning step, you MUST provide:
    1. A detailed title and description.
    2. Specific skills to acquire.
    3. Estimated time commitment.
    4. Prerequisite knowledge.
    5. Relevant certifications.

    For the "labs" and "courses" section, you MUST explicitly recommend and link to these exact industry-standard platforms:
    - Cybersecurity & Pentesting: TryHackMe (Gamified), Hack The Box Academy (Advanced), PortSwigger Academy (Web), SANS CyberAces, RangeForce (Defensive), PentesterLab.
    - Defensive & SOC: Security Onion (Analysis), Splunk Work+ (SIEM), ELK Stack Labs, Autopsy (Forensics).
    - Networking & Emulation: Cisco Networking Academy (Packet Tracer), GNS3 (Network Emulation), EVE-NG (Advanced Lab).
    - Cloud Security: AWS Skill Builder, Microsoft Azure Labs, Google Cloud Skills Boost, CloudGoat (Attack Simulation), Cloud Security Alliance (CSA).
    - DevSecOps: OWASP Juice Shop (Vulnerable App), Docker & Kubernetes Playgrounds, GitHub Security Labs.
    - Identity & GRC: Auth0 Playground, AWS IAM Workshops, RSA Archer Labs.
    
    Incorporate relevant technologies from these domains where applicable:
    Cybersecurity, Cloud (AWS/Azure/GCP), DevOps/SRE, Data Engineering, IoT/Edge, Blockchain, Quantum Computing, and Enterprise Management (Oracle Primavera, Scrum, Agile).
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
      const finishReason = response.candidates?.[0]?.finishReason;
      if (finishReason === 'SAFETY') {
        throw new RoadmapError("Our AI systems identified content that violates safety guidelines. Please refine your goal and try again.", "SAFETY_BLOCK");
      }
      throw new RoadmapError("The AI service returned an empty roadmap.", "EMPTY_RESPONSE");
    }

    try {
      const data = JSON.parse(response.text);
      return data as CareerRoadmap;
    } catch (parseError) {
      throw new RoadmapError("We encountered an error processing the generated roadmap data.", "PARSE_ERROR");
    }

  } catch (err: any) {
    if (err instanceof RoadmapError) throw err;
    throw new RoadmapError(
      err?.message || "An unexpected error occurred while connecting to the Tech Skyline intelligence engine.",
      "API_ERROR"
    );
  }
};
