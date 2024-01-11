import { GoogleGenerativeAI } from "@google/generative-ai";



const API_KEY = "AIzaSyD5LFvK9nIg-JJXI_lpVn4zsVNjUPCZz4w";
const GOOGLE_AI_MODELS = new GoogleGenerativeAI(API_KEY)


class GeminiAI {

    constructor(){
        this.__AI_MODEL__ = GOOGLE_AI_MODELS.getGenerativeAI({model: "gemini-pro"});
        this.__response = null
    }

    Send(prompt){
        const result = this.__AI_MODEL__.generateContent(prompt)
        this.__response = result.response.text();
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