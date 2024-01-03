import "./App.css";

import { IoEnterOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { MdOutlineHelpOutline } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

function App() {
  return (
    <div className="w-[15rem] h-[30rem] bg-[#121212] rounded-lg relative">
      <div className="flex flex-row text-neutral-400">
        <IoEnterOutline className="text-xl absolute left-2 translate-y-2" />
        <span className="absolute translate-x-[6rem] translate-y-2 z-10 font-semibold">
          <span className="text-white">AI</span>
          <span className="text-[#BE3838]">CA</span>
          <span className="text-[#343434]">.IO</span>
        </span>
        <span className="absolute text-[0.5rem] right-7 translate-y-[13px]">
          Off
        </span>
        <FaPowerOff className="right-2 absolute translate-y-3" />
      </div>
      <div className="bg-[#242424] w-full h-5/6 translate-y-10 overflow-y-auto hide-scrollbar">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </div>
      <div className="bg-[#121212] rounded-lg absolute translate-x-[5rem] top-1 h-[3rem] w-[5rem]" />

      <div className="flex flex-row text-neutral-400 absolute bottom-1 items-center justify-center translate-x-1">
        <CiSettings className="m-2" />
        <MdOutlineHelpOutline className="m-2" />
        <div className="rounded-sm bg-rose-600 text-white text-[0.6rem] w-[5rem] text-center p-[1px] m-2 font-medium">
          Send Prompt
        </div>
        <IoIosGlobe className="m-2" />
        <FaHistory className="m-2" />
      </div>
    </div>
  );
}

export default App;
