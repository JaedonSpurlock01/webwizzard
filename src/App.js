import { useRef, useState, useMemo } from "react";
import React from "react";
import "./App.css";

import { FaPowerOff } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { MdOutlineHelpOutline } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { GeminiAI } from "./Components/Backend/AssistantAI";
import { QuizBot} from "./Components/Backend/QuizBot";
import { SAFETY_CONFIGURATION } from "./Components/Backend/AssistantAI";
import { RotatingLines } from "react-loader-spinner";

import { VscDebugRestart } from "react-icons/vsc";


function App() {
  // The current chat box conversation/history
  const [currentConversation, setCurrentConversation] = useState([]);
  const inputBoxRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [previousPrompt, setPreviousPrompt] = useState("");
  const [isRestartClicked, setIsRestartClicked] = useState(false);

  //scrape the website using scrapper. Reads the website to generate the data
  //const scrapper = new WebScrapper();
  //scrapper.CollectData()
  

  //const AI = new GeminiAI(SAFETY_CONFIGURATION);

  const AI = useMemo(
    () =>{
      var ai =  new GeminiAI(SAFETY_CONFIGURATION)
      ai.ExtractData()
      ai.LoadKnowledge()
      ai.Train()

      return ai
    },
    [SAFETY_CONFIGURATION]
  )
  
  async function send_message() {
    if (isLoading) return;
    setIsLoading(true);

    let user_input, response;

    // Grab the text input from the reference
    if (isRestartClicked) {
      if (previousPrompt !== "") {
        user_input = previousPrompt;
      }
    } else {
      user_input = inputBoxRef.current.value;
    }

    if (user_input.length < 3) {
      setCurrentConversation(() => [
        ...currentConversation,
        "Please enter a valid prompt",
      ]);
    } else {
      setCurrentConversation((currentConversation) => [
        ...currentConversation,
        user_input,
      ]);

      await AI.Send(user_input);

      // Send user+input to AI
      response = await AI.Recieve();
      // Update conversation history
      setCurrentConversation((currentConversation) => [
        ...currentConversation,
        response,
      ]);
    }

    setIsLoading(false);

    // Clear the input field
    inputBoxRef.current.value = "";
    setPreviousPrompt(user_input);
    setIsRestartClicked(false);
  }

  return (
    <>
      {isCollapsed && (
        <button
          className="ww-absolute ww-rounded-full ww-w-10 ww-h-10 ww-right-40 ww-top-[15%] ww-bg-neutral-800"
          onClick={() => {
            setIsCollapsed(false);
          }}
        ></button>
      )}
      {!isCollapsed && (
        <div className="ww-absolute ww-right-40 ww-top-[15%]">
          <div className="ww-w-[15rem] ww-h-[30rem] ww-bg-[#121212] ww-rounded-lg ww-relative">
            <div className="ww-flex ww-flex-row ww-text-neutral-400">
              <span className="ww-absolute ww-translate-x-[6rem] ww-translate-y-2 ww-z-20 ww-font-semibold">
                <span className="ww-text-white">AI</span>
                <span className="ww-text-[#BE3838]">CA</span>
                <span className="ww-text-[#343434]">.IO</span>
              </span>
              <button
                onClick={() => {
                  setIsCollapsed(true);
                }}
              >
                <span className="ww-absolute ww-text-[0.5rem] ww-right-7 ww-translate-y-[13px]">
                  Off
                </span>
                <FaPowerOff className="ww-right-2 ww-absolute ww-translate-y-3" />
              </button>
            </div>

            <div className="ww-bg-[#343434] ww-w-full ww-h-5/6 ww-translate-y-10 ww-rounded-b-xl" />

            <div className="ww-absolute ww-w-11/12 ww-h-[14rem] ww-top-12 ww-left-2">
              <div
                className="ww-w-full ww-h-full ww-overflow-y-auto ww-hide-scrollbar ww-flex ww-flex-col"
                ref={chatBoxRef}
              >
                {currentConversation.map((current_message, index) => {
                  return (
                    <div key={index}>
                      <p className="ww-text-neutral-200 ww-mb-2 ww-break-words ww-leading-[25px] ww-text-[11px]">
                        {current_message}
                      </p>
                      <div className="ww-bg-[#505050] ww-h-[1px] ww-w-[95%] ww-mb-2" />
                    </div>
                  );
                })}
              </div>
              {isLoading && (
                <div className="ww-ml-2 ww-mt-2">
                  <RotatingLines
                    visible={true}
                    height="18"
                    width="18"
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                  />
                </div>
              )}
            </div>

            <div className="ww-absolute ww-bottom-[11.5rem] ww-right-4 ww-text-neutral-400 ww-flex">
              <button
                onClick={() => {
                  setIsRestartClicked(true);
                  send_message();
                }}
              >
                <VscDebugRestart />
              </button>
            </div>
            <form
              className="ww-absolute ww-w-11/12 ww-h-[8rem] ww-bottom-12 ww-bg-[#181818] ww-rounded-lg ww-ml-[0.6rem]"
              onSubmit={send_message}
            >
              <textarea
                ref={inputBoxRef}
                placeholder="Message WebWizzard"
                type="text"
                className="ww-h-full ww-w-full ww-text-[11px] ww-bg-transparent focus:ww-outline-none ww-text-neutral-400 ww-m-1 ww-p-1 ww-resize-none"
                rows="1"
              />
            </form>

            <div className="ww-flex ww-flex-row ww-text-neutral-400 ww-absolute ww-bottom-1 ww-items-center ww-justify-center ww-translate-x-1">
              <CiSettings className="ww-m-2" />
              <MdOutlineHelpOutline className="ww-m-2" />
              <button
                className="ww-rounded-sm ww-bg-rose-600 ww-text-white ww-text-[0.6rem] ww-w-[5rem] ww-text-center ww-p-[1px] ww-m-2 ww-font-medium"
                onClick={send_message}
              >
                Send Prompt
              </button>
              <IoIosGlobe className="ww-m-2" />
              <FaHistory className="ww-m-2" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
