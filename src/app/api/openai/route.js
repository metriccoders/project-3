import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

export async function POST(req) {
  const data = await req.json();
  console.log("Data:", data);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content: [
          {
            type: "text",
            text: "You are a resume builder. Build a perfect resume using all the information provided by the user such as universities attended, companies worke for, projects worked on, sales closed, projects managed, etc. and create a perfect resume with proper highlights of important points. The resume should be such that it should be processed by all AI based resume softwares.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: data["chatMessage"],
          },
        ],
      },
    ],
  });

  console.log("response:", response.choices[0].message.content);

  return NextResponse.json({
    message: response.choices[0].message.content,
  });
}
