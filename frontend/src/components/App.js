import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import notes from "../notes";
import Submit from "./Payment";

function App() {
  const [number, setNumber] = useState(0);
  const [data, setData] = useState([]);
  const [sessionName, setSessionName] = useState("");
  const [totalSum, setTotalSum] = useState(0);

  function increment() {
    setNumber((prevNumber) => prevNumber + 1);
  }

  useEffect(() => {
    fetch("http://localhost:5000/read-session", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setSessionName(data.message[0] || "");
          setNumber(data.message[1] || 0);
          setData(Array.isArray(data.message[2]) ? data.message[2] : []);

          console.log("Session Loaded:", data.message);

          let sum = 0;
          if (Array.isArray(data.message[2])) {
            data.message[2].forEach((key) => {
              const item = notes.find((note) => note.key === Number(key));
              if (item) {
                const price1 = item.priceOne > 0 ? item.priceOne : 0;
                const price2 = item.priceTwo > 0 ? item.priceTwo : 0;
                const price3 = item.priceThree > 0 ? item.priceThree : 0;

                let itemCount = data.message[3]?.[key] || 0;

                if (itemCount > 0) {
                  sum += (price1 * itemCount) + (price2 * itemCount) + (price3 * itemCount);
                }
              }
            });
          }
          setTotalSum(sum); 
        }
      })
      .catch((error) => console.error("Error fetching session:", error));
  }, []);

  const updateTotalSum = (priceChange, quantityChange) => {
    setTotalSum((prevTotal) => prevTotal + (priceChange * quantityChange));
  };

  return (
    <div>
      <Header number={number} />
      {sessionName === "Payment" && <Submit totalSum={totalSum} />}

      <div className="notes-container">
        {sessionName === "Payment"
          ? data
              .flatMap((key) =>
                notes.filter((note) => note.key === Number(key))
              )
              .map((note, index) => (
                <Note
                  key={`${note.title}-${index}`}
                  round={note.key}
                  title={note.title}
                  content={note.content}
                  priceOne={note.priceOne}
                  priceTwo={note.priceTwo}
                  priceThree={note.priceThree}
                  chose={true}
                  flag={1}
                  updateTotalSum={updateTotalSum} 
                />
              ))
          : notes.map((note, index) => (
              <Note
                key={`${note.title}-${index}`}
                round={note.key}
                img={note.img || "/img/default-placeholder.png"}
                title={note.title}
                content={note.content}
                priceOne={note.priceOne}
                priceTwo={note.priceTwo}
                priceThree={note.priceThree}
                increment={increment}
                updateTotalSum={updateTotalSum} 
              />
            ))}
      </div>
    </div>
  );
}

export default App;
