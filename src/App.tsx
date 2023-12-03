import "./App.css";
import Card from "./Card";
import axios from "axios";
import { useState, useEffect } from "react";
import Create from "./Create";

function App() {

  const [cards, setCards] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3004/cars").then(({ data }) => {
      setCards(data);
    });
  }, []);

  return (
    <>
      <div className="cards">
        {cards && <Card cards={cards} />}
      </div>
      <div className="add-new-wrapper">
        <Create />
      </div>
      
    </>
  );
}

export default App;
