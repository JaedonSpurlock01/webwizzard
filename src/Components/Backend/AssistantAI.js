

const { HarmBlockThreshold, HarmCategory} = require("@google/generative-ai")
const {GoogleGenerativeAI} = require('@google/generative-ai')


const API_KEY = "AIzaSyD5LFvK9nIg-JJXI_lpVn4zsVNjUPCZz4w";
const GOOGLE_AI_MODELS = new GoogleGenerativeAI(API_KEY)
const SAFETY_CONFIGURATION = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },

      {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE
      }, 

      {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      
      {
            category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
            threshold: HarmBlockThreshold.BLOCK_NONE
      },

      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE
      },

]


class GeminiAI {

    constructor(){

    }


    LoadConversations(){

    }

};

class GeminiAI {

    constructor(safety_config){
        this.__AI_MODEL__ = GOOGLE_AI_MODELS.getGenerativeModel({model: "gemini-pro"});
        this.__AI_CONVERSATION_SESSION = this.__AI_MODEL__.startChat()
   
        this.__response = null
        this.__chat_history = null; //Load the history through the backend
        /*Safety Ratings*/
        this.__safety_settings = safety_config; 
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

    PrintResponse(){
        console.log()
    }

}

let AI = new GeminiAI()

// AI.Send("How are you today")
// console.log("AI=> ", AI.Recieve())