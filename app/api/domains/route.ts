import axios from "axios";
import { NextRequest } from "next/server";
// import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextRequest) {
  try {
    const { domainName } = await req.json();

    console.log("const { domainName } ", req.body);
    if (!domainName) {
      return new Response("no domaineName in body", { status: 400 });
    }
    const availableResponse = await axios.get(
      `https://api.ote-godaddy.com/v1/domains/available?domain=${domainName}&checkType=FAST&forTransfer=false`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `sso-key ${process.env.OTE_KEY}:${process.env.OTE_SECRET}`,
        },
      }
    );
    const suggestionsResponse = await axios.get(
      `https://api.ote-godaddy.com/v1/domains/suggest?query=${domainName}&country=IN&city=hyderbad&waitMs=1000`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `sso-key ${process.env.OTE_KEY}:${process.env.OTE_SECRET}`,
        },
      }
    );
    console.log("availableResponse.data", availableResponse.data);
    console.log("suggestionsResponse.data", suggestionsResponse.data);
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          availability: availableResponse.data,
          suggestions: suggestionsResponse.data,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Error in domains api", { status: 500 });
  }
}
