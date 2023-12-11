import "./App.css";
import Cards from "./Cards";
import axios from "axios";
import { useState, useEffect } from "react";
import Create from "./Create";

function App() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/cars").then(({ data }) => {
      setCards(data.cars);
    });
  }, []);

  return (
    <>
      <div className="cards">{cards && <Cards cards={cards} />}</div>
      <div className="add-new-wrapper">
        <Create />
      </div>
    </>
  );
}

export default App;
