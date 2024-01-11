import { useRef, useState } from "react";
import "./App.css";

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
    <div className="mainframe" id="AssistantAI" style={position}>
      <div className="toppanel">
        <span className="headingmain">
          <span className="heading1">AI</span>
          <span className="heading2">CA</span>
          <span className="heading3">.IO</span>
        </span>
      </div>

      <div className="chat_area overflow-y-auto hide-scrollbar hide-scrollbar">
        {currentConversation.map((current_message) => {
          if (current_message === currentConversation[-1]) {
            return <p className="message">{current_message}</p>;
          } else {
            return (
              <> 
                <p className="message">{current_message}</p>
                <div className="divider"></div>
              </>
            );
          }
        })}  
      </div>

      <div className="input_box_wrapper">
        <textarea
          id="input_box_area"
          className="input_box"
          row="8"
          cols="5"
          ref={inputBoxRef}
        ></textarea>
      </div>

      <div className="bottompanel">
        <button
          id="aica_send_button"
          type="button"
          className="send_prompt"
          onClick={send_message}
        >
          Send Prompt
        </button>
      </div>
    </div>
  );
}

export default App;
