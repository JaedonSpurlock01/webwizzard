const {HarmBlockThreshold, HarmCategory} = require("@google/generative-ai")
const {GoogleGenerativeAI} = require('@google/generative-ai')
const WebScrapper = require("./WebScrapper.js").WebScrapper
const API_KEY = "AIzaSyD5LFvK9nIg-JJXI_lpVn4zsVNjUPCZz4w";
const GOOGLE_AI_MODELS = new GoogleGenerativeAI(API_KEY)

export const SAFETY_CONFIGURATION = [
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

class AIDataTrainer{

    constructor(){
        this.__AI_INSTANCE = null; 
        this.__KNOWLEDGE = null; 
        this.__max_token_limit = 30720; 
        this.__cutoff_limit = 25720; 
    }
    
    __merge_chunks__(){
        //Merges the chunks into a bigger chunk of a specific size

       if(this.__knowledge_empty__() == true) return; 

        //tags 'p'
        for(let i = 0; i < this.__KNOWLEDGE[0].length && this.__KNOWLEDGE[0][0].GetLength() <= 3000; i++){
            this.__KNOWLEDGE[0][0].CombineWith(this.__KNOWLEDGE[0][i])
        }
        
        let length = this.__KNOWLEDGE[0].length;
        for(let i = 1; i < length; i++){
            this.__KNOWLEDGE[0].pop()
        }

        console.log("AFTER MERGING: ", this.__KNOWLEDGE[0][0].Print(), "LENGTH: ", this.__KNOWLEDGE[0].length)

        //tag 'h'

        //other tags with 'text' 
    }

    __knowledge_empty__(){
        return (this.__KNOWLEDGE.length == 0 && this.__KNOWLEDGE[0].length == 0)
    }



    __training__(){
        
        let token_limit = 3000; 
        let char_limit = token_limit*4; 
        let response = "";
        let prompt = "please memorize this chunk of webpage information and don't print anything in response"

        //BUG REPORT: Here the problem is it's acessing null values since the page isn't actually benig read. 
        console.log("Trainer this.__KNOWLEDGE: ", this.__KNOWLEDGE)

        if(this.__knowledge_empty__() == true){
            console.log("The trainer's __KNOWLEDGE structure is completely empty please refer to AIDataTrainer()")
            return; 
        }
        
        this.__merge_chunks__(); 

        for(let i = 0; i < this.__KNOWLEDGE[0].length; i++){

            try{
                response = this.__AI_INSTANCE.sendMessage(prompt + this.__KNOWLEDGE[0][i].Slice(0, 30).ToText())
                console.log("[TRAINING ELEMENT]: ", this.__KNOWLEDGE[0][i].ToText(), "Response from AI: ", response)
                //setTimeout(()=>{}, 1300)
            }
            catch(error){
                console.log("__KNOWLEDGE: ", this.__KNOWLEDGE)
                console.log('error: ', error)
            }
        }
        
        response = this.__AI_INSTANCE.sendMessage("code 8 is my secret. let me know when I ask")
        response = this.__AI_INSTANCE.sendMessage("Now all the future questions will be regarding the webpage chunks you have memorized. ")
        //response = this.__AI_INSTANCE.sendMessage("Let me know anything I ask about those chunks. ")
    }       

    LoadKnowledge(knowledge){
        this.__KNOWLEDGE = knowledge;  
      
    }

    InitiateTraining(){
        this.__training__();
    }

    RegisterInstance(instance){
        this.__AI_INSTANCE = instance;
    }


}   


export class GeminiAI {

    constructor(safety_config){
        this.__AI_MODEL__ = GOOGLE_AI_MODELS.getGenerativeModel({model: "gemini-pro"});
        this.__AI_CONVERSATION_SESSION = this.__AI_MODEL__.startChat()
        this.__response = null
        this.__chat_history = null; //Load the history through the backend
        this.__safety_settings = safety_config; 
        
        console.log("Gemini created...")
        this.WebScrapper = new WebScrapper();
        this.AI_TRAINER = new AIDataTrainer()
        this.__KNOWLEDGE = []
        this.AI_TRAINER.RegisterInstance(this.__AI_CONVERSATION_SESSION)
    }

    async Send(prompt){

        try{
            const result = await this.__AI_CONVERSATION_SESSION.sendMessage(prompt);
            const response = await result.response;
            this.__response = response.text();
            console.log("Sent: ", prompt);
            console.log("Recieved: ", this.__response)
        } catch(error){
            this.__response = "Your request has been flagged under several harm categories"
        }
    }

    Recieve(){
        console.log("Result: ", this.__response)
        return this.__response; 
    }

    PrintResponse(){
        console.log()
    }

    GetSessionHistory(){
        return this.__AI_CONVERSATION_SESSION.getHistory();
    }

    ExtractData(){
        this.WebScrapper.CollectData();
    }

    LoadKnowledge(){ 
        this.__KNOWLEDGE.push(this.WebScrapper.getElementsByTagName('p'))
        this.__KNOWLEDGE.push(this.WebScrapper.getElementsByTagName('h'));
        this.AI_TRAINER.LoadKnowledge(this.__KNOWLEDGE)   
    }

    Train(){
        this.AI_TRAINER.InitiateTraining();
    }
}