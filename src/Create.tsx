import { useState } from "react";
import axios from "axios";

const Create = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // const card = { brand, model, color, price };

    axios.post("http://localhost:3001/car", {
        brand: brand,
        model: model,
        color: color,
        price: price,
        createdAt: new Date(),
        img: "no image",
      })
      .then(() => {
        setBrand("");
        setModel("");
        setColor("");
        setPrice("");
        window.location.reload();
      });
  };

  return (
    <div className="add-new-box">
      <h2>Add new</h2>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          className="new-title-input"
          placeholder="Brand"
          required
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          className="new-descr-input"
          placeholder="Model"
          required
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type="text"
          className="new-detail-input"
          placeholder="Color"
          required
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="text"
          className="new-price-input"
          placeholder="Price eur"
          required
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="button-add">Add</button>
      </form>
    </div>
  );
};

export default Create;
