import { useEffect, useRef, useState } from "react";
import "./App.css";

// K so we will need

// 1. useEffect() to update frontend
// 2. sendMessage() function
// 3. conversation variable
//

function App(props) {
  const position = {
    top: props.x + "px",
    left: props.y + "px",
  };

  // The current chat box conversation/history
  const [currentConversation, setCurrentConversation] = useState([]);
  const inputBoxRef = useRef(null);

  function send_message() {
    // Grab the text input from the reference
    const user_input = inputBoxRef.current.value;

    // Send user+input to AI, for now let's just do a basic response sure but wait
    const response =
      "Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah";

    // Update conversation history k dont freak out but this is how
    setCurrentConversation((currentConversation) => [
      ...currentConversation,
      user_input,
      response,
    ]);

    // Clear the input field
    inputBoxRef.current.value = "";
  }

  return (
    <div class="mainframe" id="AssistantAI" style={position}>
      <div class="toppanel">
        <span class="headingmain">
          <span class="heading1">AI</span>
          <span class="heading2">CA</span>
          <span class="heading3">.IO</span>
        </span>
      </div>

      <div className="chat_area overflow-y-auto hide-scrollbar hide-scrollbar">
        <ul>
          {currentConversation.map((current_message) => {
            return (
              <>
                <li>{current_message}</li>
                <br />
              </>
            );
          })}
        </ul>
      </div>

      <div class="input_box_wrapper">
        <textarea
          id="input_box_area"
          class="input_box"
          row="8"
          cols="5"
          ref={inputBoxRef}
        ></textarea>
      </div>

      <div class="bottompanel">
        <button
          id="aica_send_button"
          type="button"
          class="send_prompt"
          onClick={send_message}
        >
          {" "}
          {/* I see, so then u acceess eveyr property? its the better way of doing document.findById stuff*/}
          Send Prompt
        </button>
      </div>
    </div>
  );
}

export default App;
