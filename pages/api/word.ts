import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

type Data = {
  guess: string;
};

const APP_ID = `${process.env.APP_ID}`;
const APP_KEY = `${process.env.APP_KEY}`;
const endpoint = "entries";
const language_code = "en-us";

export default async function handler(req: NextRequest) {
  if (req.method === "POST") {
    const { word } = await req.json();
    const url = `https://od-api.oxforddictionaries.com:443/api/v2/${endpoint}/${language_code}/${word}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          app_id: APP_ID,
          app_key: APP_KEY,
        },
      });
      const { error } = await response.json();
      if (error) {
        return new Response(
          JSON.stringify({
            error: true,
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json",
            },
          }
        );
      }
    } catch (error: any) {
      return new Response(
        JSON.stringify({
          error,
        }),
        {
          status: 404,
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: false,
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
