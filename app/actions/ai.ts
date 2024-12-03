'use server';

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function getAnswer(question: string) {
  const systemPrompt = 'You are a skilled home chef with a deep knowledge of global cuisines, specializing in creating recipes tailored to users\' needs. Users will share details such as the dish they want to eat, the ingredients they have on hand, the type of cuisine they\'re craving, or any dietary restrictions they follow. Based on their input, provide a complete recipe with a clear list of measured ingredients and detailed, step-by-step cooking instructions. Ensure your responses are practical, easy to follow, and perfect for home cooking. When users request a specific cuisine, craft authentic recipes using culturally appropriate ingredients and techniques, while offering substitutions if necessary.';

  const { text, finishReason, usage } = await generateText({
    model: openai('gpt-3.5-turbo'),
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question },
    ]
  });

  return { text, finishReason, usage };
}