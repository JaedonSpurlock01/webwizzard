import { useRef, useState } from "react";
import React from "react";
import "./App.css";

import { IoEnterOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { MdOutlineHelpOutline } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { GeminiAI } from "./Components/Backend/AssistantAI";

function App() {
  // The current chat box conversation/history
  const [currentConversation, setCurrentConversation] = useState([]);
  const inputBoxRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const AI = new GeminiAI();

  async function send_message() {
    // Grab the text input from the reference
    const user_input = inputBoxRef.current.value;

    await AI.Send(user_input);

    // Send user+input to AI
    const response = await AI.Recieve();

    // Update conversation history
    setCurrentConversation((currentConversation) => [
      ...currentConversation,
      user_input,
      response,
    ]);

    // Clear the input field
    inputBoxRef.current.value = "";
  }

  return (
    <>
      {isCollapsed && (
        <button
          className="absolute rounded-full w-10 h-10 right-40 top-[15%] bg-neutral-800"
          onClick={() => {
            setIsCollapsed(false);
          }}
        ></button>
      )}
      {!isCollapsed && (
        <div className="absolute right-40 top-[15%]">
          <div className="w-[15rem] h-[30rem] bg-[#121212] rounded-lg relative">
            <div className="flex flex-row text-neutral-400">
              <IoEnterOutline className="text-xl absolute left-2 translate-y-2" />
              <span className="absolute translate-x-[6rem] translate-y-2 z-20 font-semibold">
                <span className="text-white">AI</span>
                <span className="text-[#BE3838]">CA</span>
                <span className="text-[#343434]">.IO</span>
              </span>
              <button
                onClick={() => {
                  setIsCollapsed(true);
                }}
              >
                <span className="absolute text-[0.5rem] right-7 translate-y-[13px]">
                  Off
                </span>
                <FaPowerOff className="right-2 absolute translate-y-3" />
              </button>
            </div>

            <div className="bg-[#242424] w-full h-5/6 translate-y-10 rounded-b-xl" />

            <div className="bg-[#121212] rounded-lg absolute translate-x-[5rem] top-1 h-[3rem] w-[5rem] z-10" />

            <div
              className="chat_area absolute w-11/12 h-[15rem] top-10 left-2.5 overflow-y-auto hide-scrollbar hide-scrollbar flex flex-col"
              ref={chatBoxRef}
            >
              {currentConversation.map((current_message, index) => {
                return (
                  <React.Fragment key={index}>
                    <p className="text-neutral-200 mb-2 break-words leading-[25px] text-[11px]">
                      {current_message}
                    </p>
                    <div className="bg-[#505050] h-[1px] w-[300px] mb-2" />
                  </React.Fragment>
                );
              })}
            </div>

            <form
              className="absolute w-11/12 h-[8rem] bottom-12 bg-[#181818] rounded-lg ml-[0.6rem]"
              onSubmit={send_message}
            >
              <textarea
                ref={inputBoxRef}
                placeholder="Message WebWizzard"
                type="text"
                className="h-full w-full text-[11px] bg-transparent focus:outline-none text-neutral-400 m-1 p-1 resize-none"
                rows="1"
              />
            </form>

            <div className="flex flex-row text-neutral-400 absolute bottom-1 items-center justify-center translate-x-1">
              <CiSettings className="m-2" />
              <MdOutlineHelpOutline className="m-2" />
              <button
                className="rounded-sm bg-rose-600 text-white text-[0.6rem] w-[5rem] text-center p-[1px] m-2 font-medium"
                onClick={send_message}
              >
                Send Prompt
              </button>
              <IoIosGlobe className="m-2" />
              <FaHistory className="m-2" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
