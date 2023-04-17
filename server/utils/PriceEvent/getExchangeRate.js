import axios from "axios";
import { response } from "express";

export async function GetCurrentExchangeRate(symbols) {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "Bx9Zhw56PPzWqj1GVTBsQRbER9KHoPwo");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(
    `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base={USD}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  // let data = await axios.get(
  //     `https://api.exchangeratesapi.io/v1/latest?access_key=Bx9Zhw56PPzWqj1GVTBsQRbER9KHoPwo&base=USD&symbols=${currency}`,
  //     {
  //         headers: {
  //             apikey: "Bx9Zhw56PPzWqj1GVTBsQRbER9KHoPwo"
  //         }
  //     }
  //     );

  // console.log("🚀 ~ file: getExchangeRate.js:18 ~ GetCurrentExchangeRate ~ data:", data.data)

  return 2;
}
