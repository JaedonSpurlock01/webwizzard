import "./AssistantUI.css";

class LaunchAIButton{

    constructor(){
      return this.__UI__()
    }


    __UI__(){
      return(
        <div class="launch_button_wrapper" id="LaunchAIButton">
          <button class="launch_button">
          </button>
        </div>
      )
    }

};


class AssistantAI{

    /*Any important setup parameters to pass*/
    constructor(){
      return this.__UI__();
    }


    __UI__(){

      return(
       
        <div class="mainframe" id="AssistantAI">

          <div class="toppanel">
            <span class="headingmain">
              <span class="heading1">AI</span>
              <span class="heading2">CA</span>
              <span class="heading3">.IO</span>
            </span>
          </div>
          

          <textarea id="response_display" readOnly class="chat_area">
          </textarea>

          <div class="input_box_wrapper"> 
            <textarea class="input_box" row="8" cols="5"></textarea>
          </div>

          <div class="bottompanel">
            <button type="button" class="send_prompt" onclick="send_message()">
              Send Prompt
            </button>
          </div>

        </div>
      )
    }


};



function App(){
  return (new AssistantAI());
}


export function Launcher(){
  return (new LaunchAIButton())
}


export default App; 


