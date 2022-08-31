import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Modal from "./modal";

const Game = () => {
  const [word, setWord] = useState<string>("water");
  const [attempts, setAttempts] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [current, setCurrent] = useState<number>(0);
  const [won, setWon] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [os, setOs] = useState<string>("");

  let rowRefs = useRef<Array<HTMLDivElement | null>>(new Array(6).fill(null));

  const wait = (fn: any, ms: number) => {
    return new Promise((resolve) => setTimeout(() => resolve(fn()), ms));
  };

  useEffect(() => {
    let details = navigator.userAgent;

    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);
    if (isMobileDevice) {
      setOs("Mobile");
    } else {
      setOs("Desktop");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handlePress);

    return () => {
      window.removeEventListener("keydown", handlePress);
    };
  }, [attempts, guess, current]);

  const handlePress = async (e: any) => {
    let row: any = rowRefs.current[attempts]?.children;
    if (attempts <= 5 && current <= 4 && e.keyCode >= 65 && e.keyCode <= 90) {
      setGuess((prev) => prev + e.key);
      if (!row[current].innerHTML) {
        row[current].innerHTML = e.key;
        row[current].classList.add("active");
        setCurrent(current + 1);
      }
    }
    if (e.key === "Backspace") {
      if (current >= 1) {
        row[current - 1].innerHTML = "";
        row[current - 1].classList.remove("active");
        deleteLetter();
        setCurrent(current - 1);
      }
    }

    if (e.key === "Enter") {
      if (!guess) {
        setError("please enter a guess");
        await wait(() => setError(""), 600);
        return;
      }
      if (guess.length < 5) {
        setError("Too short");
        await wait(() => setError(""), 600);
        return;
      }
      await checkIfWordIsValid(guess);
    }
  };

  const deleteLetter = (): void => {
    setGuess((guess) => guess.slice(0, -1));
  };

  const checkIfCorrect = async () => {
    let currentRow: any = rowRefs.current[attempts]?.children;

    for (let i = 0; i < currentRow.length; i++) {
      if (currentRow[i].innerHTML === word[i]) {
        setBackgroundAndTransition("green", currentRow[i], i);
      } else if (word.includes(currentRow[i].innerHTML)) {
        setBackgroundAndTransition("orange", currentRow[i], i);
      } else {
        setBackgroundAndTransition("gray", currentRow[i], i);
      }
    }

    if (guess === word) {
      await wait(() => {
        setStatus("You won 🎉");
        setWon(true);
      }, 2000);
      await wait(() => {
        setWon(false);
        setShowModal(true);
      }, 6000);
    }
    if (attempts === 5 && guess !== word) {
      await wait(() => {
        setStatus("You lost 😔, try again!");
        setShowModal(true);
      }, 3000);
    }
    return;
  };

  const checkIfWordIsValid = async (guess: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/word`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ word: guess }),
      });
      const { error } = await response.json();
      if (error) {
        setError("Invalid word");
        setTimeout(() => {
          setError("");
        }, 600);
        return;
      }
    } catch (err) {
      console.log("err", err);
    }
    await checkIfCorrect();
    attempts <= 5 && setAttempts((prev) => prev + 1);
    setCurrent(0);
    setError("");
    setGuess("");
    return;
  };

  const reset = () => {
    for (let i = 0; i < attempts; i++) {
      let currentRow: any = rowRefs.current[i]?.children;
      for (let j = 0; j < currentRow.length; j++) {
        currentRow[j].innerHTML = "";
        currentRow[j].style.backgroundColor = "rgb(248 250 252)";
        currentRow[j].classList.remove("active");
        currentRow[j].style.transition = "none";
      }
    }
    setAttempts(0);
    setCurrent(0);
    setGuess("");
    setShowModal(false);
  };

  const setBackgroundAndTransition = (
    color: string,
    currentRow: HTMLDivElement,
    i: number
  ): void => {
    currentRow.style.backgroundColor = color;
    currentRow.style.transition = `background-color ${i + 0.1 * 0.5}s ease`;
  };

  const handleKeyboardPress = async (e: any) => {
    let row: any = rowRefs.current[attempts]?.children;
    if (
      attempts <= 5 &&
      current <= 4 &&
      e !== "{enter}" &&
      e !== "{backspace}"
    ) {
      setGuess((prev) => prev + e);
      if (!row[current].innerHTML) {
        row[current].innerHTML = e;
        row[current].classList.add("active");
        setCurrent(current + 1);
      }
    }
    if (e === "{backspace}") {
      if (current >= 1) {
        row[current - 1].innerHTML = "";
        row[current - 1].classList.remove("active");
        deleteLetter();
        setCurrent(current - 1);
      }
    }

    if (e === "{enter}") {
      if (!guess) {
        setError("please enter a guess");
        await wait(() => setError(""), 600);
        return;
      }
      if (guess.length < 5) {
        setError("Too short");
        await wait(() => setError(""), 600);
        return;
      }
      await checkIfWordIsValid(guess);
    }
  };

  return (
    <div className="relative p-4">
      {showModal && (
        <Modal setShowModal={setShowModal} reset={reset} status={status} />
      )}
      {won && (
        <div className="absolute -top-24">
          <Confetti width={300} height={300} />
        </div>
      )}
      <div className="flex flex-col relative">
        {error && (
          <div className="absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-2/4 w-[200px] h-16 bg-white rounded shadow-2xl flex items-center justify-center text-xs font-bold uppercase">
            {error}
          </div>
        )}
        {new Array(6).fill(null).map((_item: null, index) => (
          <div
            key={index}
            className="flex space-x-3 mt-2"
            ref={(el) => (rowRefs.current[index] = el)}
          >
            {new Array(5).fill(null).map((_item: null, i: number) => (
              <div
                key={i}
                className="w-[50px] h-[50px] bg-slate-50 border-2 border-gray-300 outline-none rounded font-bold flex items-center justify-center uppercase text-lg"
              ></div>
            ))}
          </div>
        ))}
      </div>
      {os === "Mobile" && (
        <div className="mt-5">
          <Keyboard
            keyboardRef={(r) => console.log(r)}
            layoutName="default"
            onKeyPress={handleKeyboardPress}
            layout={{
              default: [
                "q w e r t y u i o p",
                "a s d f g h j k l {enter}",
                "z x c v b n m {backspace}",
              ],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Game;
