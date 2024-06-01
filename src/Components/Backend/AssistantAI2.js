

export const SAFETY_CONFIGURATION = [

]

export class GeminiAI {

    constructor(safety_config){
        this._response = "None"
    }

    async Send(prompt){
        var data = {'User':prompt};
        var url = "http://38.56.129.131:8888/chat"

        try {
            const response = await fetch(url, {
                method: 'POST', // Set the HTTP method to POST
                headers: { 'Content-Type': 'application/json' }, // Set the content type
                body: JSON.stringify(data) // Convert data to a JSON string
              });
            
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            
              const responseData = await response.json();
              console.log(responseData); // Handle the response data
              this._response = responseData['AI'];
        }
        catch{
            console.log("error")
        }
    }

    Recieve(){
        return this._response
    }

    PrintResponse(){
        console.log()
    }

    GetSessionHistory(){
        return "YES"
    }

    ExtractData(){
        return "No data"
    }

    LoadKnowledge(){ 
    }

    Train(){
    }
}