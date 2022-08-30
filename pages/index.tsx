import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Game from "../components/game";
import Rules from "../components/game/rules";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full h-screen justify-evenly">
        <Rules />
        <section className="flex justify-center items-center">
          <Game />
        </section>
      </main>
    </div>
  );
};

export default Home;
