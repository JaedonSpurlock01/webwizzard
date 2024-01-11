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
import { SAFETY_CONFIGURATION } from "./Components/Backend/AssistantAI";
import { RotatingLines } from "react-loader-spinner";

function App() {
  // The current chat box conversation/history
  const [currentConversation, setCurrentConversation] = useState([]);
  const inputBoxRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const AI = new GeminiAI(SAFETY_CONFIGURATION);

  async function send_message() {
    if (isLoading) return;
    setIsLoading(true);

    // Grab the text input from the reference
    const user_input = inputBoxRef.current.value;

    setCurrentConversation((currentConversation) => [
      ...currentConversation,
      user_input,
    ]);

    await AI.Send(user_input);

    // Send user+input to AI
    const response = await AI.Recieve();

    setIsLoading(false);

    // Update conversation history
    setCurrentConversation((currentConversation) => [
      ...currentConversation,
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

            <div
              className="chat_area absolute w-11/12 h-[14rem] top-10 left-2.5 overflow-y-auto hide-scrollbar hide-scrollbar flex flex-col last:hidden"
              ref={chatBoxRef}
            >
              {currentConversation.map((current_message, index) => {
                return (
                  <div key={index}>
                    <p className="text-neutral-200 mb-2 break-words leading-[25px] text-[11px]">
                      {current_message}
                    </p>
                    <div className="bg-[#505050] h-[1px] w-[300px] mb-2" />
                  </div>
                );
              })}
              {isLoading && (
                <RotatingLines
                  visible={true}
                  height="18"
                  width="18"
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                />
              )}
            </div>

            <button className="absolute bottom-[11.5rem] left-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="22"
                viewBox="0 0 119 22"
                fill="none"
              >
                <path
                  d="M46.2179 12V3M40.1664 15.09L40.9228 12H36.5129C36.278 12 36.0464 11.9458 35.8363 11.8416C35.6262 11.7375 35.4435 11.5863 35.3026 11.4C35.1617 11.2137 35.0664 10.9974 35.0244 10.7683C34.9824 10.5392 34.9948 10.3036 35.0605 10.08L36.823 4.08C36.9147 3.76843 37.1058 3.49473 37.3676 3.3C37.6295 3.10527 37.948 3 38.2753 3H48.4871C48.8884 3 49.2732 3.15804 49.5569 3.43934C49.8406 3.72064 50 4.10218 50 4.5V10.5C50 10.8978 49.8406 11.2794 49.5569 11.5607C49.2732 11.842 48.8884 12 48.4871 12H46.3994C46.1179 12.0001 45.8421 12.0781 45.6029 12.2252C45.3637 12.3723 45.1706 12.5826 45.0454 12.8325L42.4357 18C42.079 17.9956 41.7279 17.9114 41.4086 17.7536C41.0894 17.5957 40.8102 17.3684 40.592 17.0886C40.3738 16.8088 40.2222 16.4837 40.1485 16.1376C40.0748 15.7915 40.0809 15.4334 40.1664 15.09Z"
                  stroke="white"
                  stroke-opacity="0.8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.2179 7V16M6.16641 3.91L6.92284 7H2.51286C2.278 7 2.04636 7.05422 1.83629 7.15836C1.62622 7.2625 1.44349 7.41371 1.30257 7.6C1.16165 7.78629 1.06642 8.00256 1.0244 8.23167C0.982389 8.46078 0.994752 8.69645 1.06051 8.92L2.823 14.92C2.91465 15.2316 3.10575 15.5053 3.36763 15.7C3.6295 15.8947 3.948 16 4.27534 16H14.4871C14.8884 16 15.2732 15.842 15.5569 15.5607C15.8406 15.2794 16 14.8978 16 14.5V8.5C16 8.10218 15.8406 7.72064 15.5569 7.43934C15.2732 7.15804 14.8884 7 14.4871 7H12.3994C12.1179 6.99985 11.8421 6.92186 11.6029 6.77479C11.3637 6.62772 11.1706 6.41741 11.0454 6.1675L8.4357 1C8.07899 1.00438 7.72788 1.08863 7.40862 1.24645C7.08936 1.40427 6.81019 1.63158 6.59198 1.9114C6.37377 2.19122 6.22215 2.51632 6.14846 2.8624C6.07477 3.20848 6.08091 3.5666 6.16641 3.91Z"
                  stroke="white"
                  stroke-opacity="0.8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M69 21V5C69 4.45 69.196 3.97933 69.588 3.588C69.98 3.19667 70.4507 3.00067 71 3H81C81.55 3 82.021 3.196 82.413 3.588C82.805 3.98 83.0007 4.45067 83 5V21L76 18L69 21ZM69 21L76 15.8L81 17.95V5H71L69 21Z"
                  fill="white"
                  fill-opacity="0.8"
                />
                <path
                  d="M103 2V22H119V7.07231L118.776 6.83154L113.976 2.21615L113.725 2.00077L103 2ZM104.6 3.53846H112.6V8.15385H117.4V20.4615H104.6V3.53846ZM114.2 4.64462L116.25 6.61538H114.2V4.64462ZM107 9.69231V11.2308H115V9.69231H107ZM107 12.7692V14.3077H115V12.7692H107ZM107 15.8462V17.3846H115V15.8462H107Z"
                  fill="white"
                  fill-opacity="0.8"
                />
              </svg>
            </button>

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
