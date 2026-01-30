
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
    
    You MUST prioritize recommending these specific "Full Permission" industry-standard labs and platforms based on the learning level:

    1. CYBERSECURITY & RISK MANAGEMENT:
       - Red Team / Offensive: TryHackMe (Guided paths), Hack The Box Academy (Advanced), PortSwigger Academy (Web Security), PentesterLab.
       - Blue Team / SOC: RangeForce (Enterprise simulations), Blue Team Labs Online (SOC practice), Security Onion (SIEM), Splunk Work+ / Splunk BOTS.
       - Governance & Risk: ISC2 (1MCC), SANS CyberAces, OpenSecurityTraining.info, CyberDegrees.org.
       - Forensics & Threat Intelligence: Autopsy, Volatility, Any.run, Cuckoo Sandbox.

    2. INFRASTRUCTURE & CLOUD:
       - Networking: Cisco Networking Academy (NetAcad), Cisco Packet Tracer, GNS3, EVE-NG.
       - Cloud Security: AWS Skill Builder / AWS Academy, Microsoft Azure Labs, Google Cloud Skills Boost (Qwiklabs), CloudGoat (AWS Attack), AzureGoat.

    3. DEVSECOPS & APPSEC:
       - Vulnerable Apps: OWASP Juice Shop, DVWA, WebGoat.
       - CI/CD Security: Snyk, SonarQube, GitHub Security Labs (CodeQL), Docker & Kubernetes Playgrounds.

    For each learning step, provide:
    - Detailed title, description, and time commitment.
    - Specific technical skills (e.g., "Burp Suite Intruder usage", "SIEM Detection Rule authoring").
    - Prerequisites and relevant certifications.

    For the "labs" section, ensure you include at least 5 highly relevant labs from the specific platforms listed above.
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
