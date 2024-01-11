//import { GoogleGenerativeAI } from "@google/generative-ai";

const {GoogleGenerativeAI} = require('@google/generative-ai')


const API_KEY = "AIzaSyD5LFvK9nIg-JJXI_lpVn4zsVNjUPCZz4w";
const GOOGLE_AI_MODELS = new GoogleGenerativeAI(API_KEY)

async function run() {
    // For text-only input, use the gemini-pro model
    const model = GOOGLE_AI_MODELS.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Write a story about a magic backpack."
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }



class GeminiAI {

    constructor(){
        this.__AI_MODEL__ = GOOGLE_AI_MODELS.getGenerativeModel({model: "gemini-pro"});
        this.__response = null
    }

    async Send(prompt){
        const result = await this.__AI_MODEL__.generateContent(prompt);
        const response = await result.response;
        this.__response = response.text();
        console.log("Sent: ", prompt);
        console.log("Recieved: ", this.__response)
    }

    Recieve(){
        console.log("Result: ", this.__response)
        return this.__response; 
    }

}

let AI = new GeminiAI()

AI.Send("How are you today")
console.log("AI=> ", AI.Recieve())
