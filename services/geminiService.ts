import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRobotPitch = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Genera una descripción breve (máximo 40 palabras), persuasiva y futurista en Español para un robot humanoide doméstico ficticio llamado 'NeoGenesis X-1'. Debe sonar increíblemente avanzado, mencionando IA emocional y limpieza cuántica.",
    });
    return response.text || "La revolución doméstica ha llegado. Inteligencia artificial superior al servicio de tu hogar.";
  } catch (error) {
    console.error("Error fetching pitch:", error);
    return "Experimenta la verdadera libertad con el asistente doméstico más avanzado del mundo. NeoGenesis X-1 está aquí para cambiar tu vida.";
  }
};

export const generateFakeReview = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: "Escribe una reseña corta de 1 frase de un cliente extasiado que ganó el robot 'NeoGenesis X-1', en Español.",
        });
        return response.text || "¡No puedo creer que limpie mi casa mientras duermo! Es un sueño hecho realidad.";
      } catch (error) {
        return "¡Cambió mi vida por completo! Ya no tengo que preocuparme por las tareas del hogar.";
      }
}