"use server";

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeAudio(formData: FormData) {
  try {
    const file = formData.get("audio") as File;
    if (!file) throw new Error("No file provided");

    // Convert File to a Readable stream
    const buffer = await file.arrayBuffer();
    const blob = new Blob([buffer], { type: file.type });
    const fileStream = new File([blob], file.name, { type: file.type });

    // Step 1: Transcribe audio
    const transcription = await openai.audio.transcriptions.create({
      file: fileStream,
      model: "whisper-1",
    });

    const transcriptText = transcription.text;

    // Step 2: Generate tasks from transcript
    const prompt = `
      Go through the transcript below as the user explains their day.
      Generate a list of tasks in JSON format with these fields:
      - task (string)
      - duration_minutes (integer)
      - priority ("high" or "low")
      - tags (array of strings) with two or three tags at maximum

      Transcript:
      ${transcriptText}
      Respond ONLY with valid JSON.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a task assistant that generates JSON lists from text.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_completion_tokens: 2000,
    });

    const tasksJSON = response.choices[0].message?.content;

    return {
      success: true,
      tasks: tasksJSON,
    };
  } catch (error: any) {
    console.error("Error generating tasks:", error);
    return { success: false, error: error.message };
  }
}
