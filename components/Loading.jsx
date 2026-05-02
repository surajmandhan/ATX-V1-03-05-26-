import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] w-full">
      <style>{`
        #bubble1 { animation: vapour 1.2s linear infinite; }
        #bubble2 { animation: vapour1 1s linear infinite; }
        #bubble3 { animation: vapour2 0.8s linear infinite; }
        
        @keyframes vapour {
            0%   { transform: translate(20px, 50px); }
            25%  { transform: translate(0, 0px); opacity: 0.8; }
            50%  { transform: translate(30px, -50px); opacity: 0.6; }
            75%  { transform: translate(0, -100px); opacity: 0.4; }
            100% { transform: translate(50px, -150px); opacity: 0.1; }
        }
        @keyframes vapour1 {
            0%   { transform: translate(0, 200px); }
            25%  { transform: translate(40px, 150px); opacity: 0.8; }
            50%  { transform: translate(30px, 100px); opacity: 0.6; }
            75%  { transform: translate(0, 50px); opacity: 0.4; }
            100% { transform: translate(50px, 0px); opacity: 0.1; }
        }
        @keyframes vapour2 {
            0%   { transform: translate(20px, 250px); }
            25%  { transform: translate(0, 200px); opacity: 0.8; }
            50%  { transform: translate(30px, 150px); opacity: 0.6; }
            75%  { transform: translate(0, 100px); opacity: 0.4; }
            100% { transform: translate(50px, 50px); opacity: 0.1; }
        }
        
        .loading-text {
            color: var(--cream, white);
            font-family: "Bebas Neue", sans-serif;
            margin-top: 25px;
            letter-spacing: 0.15em;
            animation: text-anim 2s ease-in-out infinite;
        }

        @keyframes text-anim {
            0% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(10px); font-size: 1.6rem; opacity: 0.5; }
            100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      
      <div className="flask flex justify-center items-center h-32 md:h-40 relative">
        <svg className="h-full w-auto" viewBox="0 0 502 977" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Group 1">
            <path id="liquid" d="M43 427H459C461.209 427 463 428.791 463 431V724C463 841.084 368.084 936 251 936C133.916 936 39 841.084 39 724V431C39 428.791 40.7909 427 43 427Z" fill="#C5CBFE" stroke="#7098FF" strokeWidth="2"/>
            <path id="flask" d="M3.5 3.5H498.5V726C498.5 862.69 387.69 973.5 251 973.5C114.31 973.5 3.5 862.69 3.5 726V3.5Z" stroke="white" strokeWidth="10"/>
            <circle id="bubble1" cx="144.5" cy="303.5" r="29.5" fill="#CBE9FF" stroke="#B1BAFF" strokeWidth="2"/>
            <path id="bubble2" d="M376 207C376 223.001 362.808 236 346.5 236C330.192 236 317 223.001 317 207C317 190.999 330.192 178 346.5 178C362.808 178 376 190.999 376 207Z" fill="#CBE9FF" stroke="#B1BAFF" strokeWidth="2"/>
            <circle id="bubble3" cx="238.5" cy="65.5" r="29.5" fill="#CBE9FF" stroke="#B1BAFF" strokeWidth="2"/>
          </g>
        </svg>
      </div>
      <h2 className="loading-text text-2xl">LOADING...</h2>
    </div>
  );
};

export default Loading;
