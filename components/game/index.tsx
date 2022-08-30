import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
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

  let rowRefs = useRef<Array<HTMLDivElement | null>>(new Array(6).fill(null));

  const wait = (fn: any, ms: number) => {
    return new Promise((resolve) => setTimeout(() => resolve(fn()), ms));
  };

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
      // if (attempts >= 5) {

      // }
      if (!guess) {
        setError("please enter a guess");
        setTimeout(() => {
          setError("");
        }, 600);

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
    const endpoint = "entries";
    const language_code = "en-us";
    const url = `https://od-api.oxforddictionaries.com:443/api/v2/${endpoint}/${language_code}/${guess}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          app_id: `${process.env.NEXT_PUBLIC_APP_ID}`,
          app_key: `${process.env.NEXT_PUBLIC_APP_KEY}`,
        },
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
    </div>
  );
};

export default Game;
