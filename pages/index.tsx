import type { NextPage } from "next";
import Head from "next/head";
import Game from "../components/game";
import Rules from "../components/game/rules";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen ">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full lg:h-screen justify-evenly flex-col lg:flex-row ">
        <section className="flex justify-center items-center">
          <Game />
        </section>
        <Rules />
      </main>
    </div>
  );
};

export default Home;
