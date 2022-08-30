import React from "react";

const Rules = () => {
  return (
    <div className="flex flex-col items-center space-y-4 py-4">
      <div className="w-[500px] h-8 rounded bg-slate-200 flex items-center justify-center font-medium text-md">
        <p>How to play</p>
      </div>
      <p className="w-[400px] text-center text-sm text-gray-500">
        You have to guess the hidden word in 6 tries and the color of the
        letters changes to show how close you are.
      </p>
      <p className="w-[400px] text-center text-sm text-gray-500">
        To start the game, just enter any word, for example:
      </p>
      <div className="flex space-x-2 ">
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-gray-500 ">
          T
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-orange-400 ">
          A
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-gray-500 ">
          B
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-orange-400 ">
          L
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-green-500 ">
          E
        </div>
      </div>
      <div className="w-[350px] h-[120px] flex p-3 text-md font flex-col space-y-2 rounded bg-slate-200">
        <div className="flex space-x-1 ">
          <span className="w-[20px] h-[20px] flex items-center justify-center text-md font-medium rounded bg-gray-500">
            T
          </span>
          <span>,</span>
          <span className="w-[20px] h-[20px] flex items-center justify-center text-md font-medium rounded bg-gray-500">
            B
          </span>
          <p className="text-sm text-gray-500">
            aren't in the target word at all.
          </p>
        </div>
        <div className="flex space-x-1 ">
          <span className="w-[20px] h-[20px] flex items-center justify-center text-md font-medium rounded bg-orange-400">
            A
          </span>
          <span>,</span>
          <span className="w-[20px] h-[20px] flex items-center justify-center text-md font-medium rounded bg-orange-400">
            L
          </span>
          <p className="text-sm text-gray-500">
            is in the word but in the wrong spot.
          </p>
        </div>
        <div className="flex space-x-1 ">
          <span className="w-[20px] h-[20px] flex items-center justify-center text-md font-medium rounded bg-green-500">
            E
          </span>

          <p className="text-sm text-gray-500">
            is in the word and in the correct spot.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Another try to find matching letters in the target word.
      </p>
      <div className="flex space-x-2 ">
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-green-500 ">
          F
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-green-500 ">
          L
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-green-500 ">
          A
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-gray-500 ">
          S
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-gray-500 ">
          H
        </div>
      </div>
      <p className="text-sm text-gray-500">So close!</p>
      <div className="flex space-x-2 ">
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-green-500 ">
          F
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-green-500 ">
          L
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-green-500 ">
          A
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-green-500 ">
          M
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center text-md font-medium rounded bg-green-500 ">
          E
        </div>
      </div>
      <p className="text-sm text-gray-500">Got it! 🏆</p>
    </div>
  );
};

export default Rules;
