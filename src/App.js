import { useRef, useState } from "react"
import "./App.css"


function divider(){
  //Divide the area which indicates user vs AI response
}

function response_wrapper(response){
  return(response)
  //Wrapp the response produced by backend server into a css style and return it
}

function inject_response(response){
  //inject the recieved and wrapped response into a specific element by id
}   


function backend_listener(){
  //Listen to any incoming responses from the backend for the response
}


function App(props){    
    const position = {
        top: props.x + "px",
        left: props.y + "px"
    }
  
    const[val, setVal] = useState('yes')


    function send_message(){
      //Encrypt the http request with the message from the input box to the server
      

      let chat = document.getElementById("aica_chat_area")
      let inputbx = document.getElementById("input_box_area")
      

      if(val === 'yes'){
        setVal('no')
      }
      else if(val === 'no'){
        setVal('yes')
      }

      console.log(val + "recieved" + " box" + inputbx.innerHTML)
      chat.innerHTML = inputbx.innerHTML

    }


    return(
        <div class="mainframe" id="AssistantAI" style={position}>

          <div class="toppanel" >
            <span class="headingmain">
              <span class="heading1">AI</span>
              <span class="heading2">CA</span>
              <span class="heading3">.IO</span>
            </span>
          </div>
          
          <textarea id="aica_chat_area" readOnly class="chat_area">{val}
          </textarea>

          <div class="input_box_wrapper"> 
            <textarea id="input_box_area" class="input_box" row="8" cols="5" ></textarea>
          </div>

          <div class="bottompanel">
            <button id="aica_send_button" type="button" class="send_prompt" onClick={send_message}>
              Send Prompt
            </button>
          </div>

        </div>
    )
}




export default App; 