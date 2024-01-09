// 0. Import Dependencies
import OpenAI from "openai";
import dotenv from "dotenv";
import { OpenAI as LangchainOpenAI } from "@langchain/openai";
import { Ollama } from "@langchain/community/llms/ollama";
import api from 'api';
// 1. Initialize the Perplexity SDK
const sdk = api('@pplx/v0#rht322clnm9gt25');
// 2. Configure environment variables
dotenv.config();
sdk.auth(process.env.PERPLEXITY_API_KEY);
// 3. Define the response data structure
interface ResponseData {
    data: string;
    contentType: string;
    model: string;
}
// 4. Initialize the OpenAI instance
const openai = new OpenAI();
// 5. Function to create audio from text
async function createAudio(introMessage: string, fullMessage: string, voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer") {
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: voice,
        input: fullMessage,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer.toString('base64');
}
// 6. HTTP POST handler function
export async function POST(req: Request, res: Response): Promise<ResponseData> {
    const body = await req.json();
    let message = body.message.toLowerCase();
    let modelName = body.prevModel || "gpt";
    // 7. Function to remove the first word of a string
    const removeFirstWord = (text: string) => text.includes(" ") ? text.substring(text.indexOf(" ") + 1) : "";
    message = removeFirstWord(message);
    // 8. Initialize variables for messages and audio
    let introMessage = "", base64Audio, voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer" = "echo", gptMessage, fullMessage;
    // 9. Common prompt for all models
    const commonPrompt = "Be precise and concise, never respond in more than 1-2 sentences! " + message;
    // 10. Handle different model cases
    if (modelName === "gpt") {
        const llm = new LangchainOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
        });
        gptMessage = await llm.invoke(commonPrompt);
        introMessage = "GPT3 point 5 here, ";
        voice = "echo";
    } else if (modelName === "gpt4") {
        // 11. Handling GPT-4 model
        const llm = new LangchainOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: 'gpt-4'
        });
        gptMessage = await llm.invoke(commonPrompt);
        introMessage = "GPT-4 here, ";
        voice = "echo";
    } else if (modelName === "local mistral") {
        // 12. Handling local Mistral model
        const llm = new Ollama({
            baseUrl: "http://localhost:11434",
            model: "mistral",
        });
        gptMessage = await llm.invoke(commonPrompt);
        introMessage = "Ollama Mitral-7B here, ";
        voice = "fable";
    } else if (modelName === "local llama") {
        // 13. Handling local Llama model
        const llm = new Ollama({
            baseUrl: "http://localhost:11434",
            model: "llama2",
        });
        gptMessage = await llm.invoke(commonPrompt);
        introMessage = "Ollama Llama 2 here, ";
        voice = "fable";
    } else if (modelName === "mixture") {
        // 14. Handling Mixture model
        const response = await sdk.post_chat_completions({
            model: 'mixtral-8x7b-instruct',
            messages: [{ role: 'user', content: commonPrompt }]
        });
        gptMessage = response.data.choices[0].message.content;
        introMessage = "Mixtral here, ";
        voice = "alloy";
    } else if (modelName === "mistral") {
        // 15. Handling Mistral model
        const response = await sdk.post_chat_completions({
            model: 'mistral-7b-instruct',
            messages: [{ role: 'user', content: commonPrompt }]
        });
        gptMessage = response.data.choices[0].message.content;
        introMessage = "Mistral here, ";
        voice = "nova";
    } else if (modelName === "perplexity") {
        // 16. Handling Perplexity model
        const response = await sdk.post_chat_completions({
            model: 'pplx-70b-online',
            messages: [
                { role: 'system', content: commonPrompt },
                { role: 'user', content: commonPrompt }
            ]
        });
        gptMessage = response.data.choices[0].message.content;
        introMessage = "Perplexity here, ";
        voice = "onyx";
    } else if (modelName === "llama") {
        // 17. Handling Llama model
        const response = await sdk.post_chat_completions({
            model: 'llama-2-70b-chat',
            messages: [{ role: 'user', content: commonPrompt }]
        });
        gptMessage = response.data.choices[0].message.content;
        introMessage = "Llama 2 70B here, ";
        voice = "nova";
    }
    // 18. Compile the full message and create the audio
    fullMessage = introMessage + gptMessage;
    base64Audio = await createAudio(introMessage, fullMessage, voice);
    // 19. Return the response
    return Response.json({ data: base64Audio, contentType: 'audio/mp3', model: modelName });
}
