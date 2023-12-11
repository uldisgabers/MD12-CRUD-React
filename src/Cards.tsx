import { formatDistance, parseISO } from "date-fns";
import axios from "axios";
import { useState } from "react";

type Car = {
  id: number;
  img: string;
  brand: string;
  model: string;
  color: string;
  price: string;
  createdAt: string;
};

const Cards = (props) => {
  const cards = props.cards;

  const handleDelete = (carId: number) => {
    axios.delete("http://localhost:3001/cars/" + carId).then(() => {
      window.location.reload();
    });
  };

  const [carId, setCarId] = useState(-1);
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carPrice, setCarPrice] = useState("");

  const [newCarBrand, setNewCarBrand] = useState("");
  const [newCarModel, setNewCarModel] = useState("");
  const [newCarColor, setNewCarColor] = useState("");
  const [newCarPrice, setNewCarPrice] = useState("");

  const [editVisibility, setEditVisibility] = useState("none");

  const handleEdit = (
    carId: number,
    brand: string,
    model: string,
    color: string,
    price: string
  ) => {
    setEditVisibility("block");

    setCarId(carId);
    setCarBrand(brand);
    setCarModel(model);
    setCarColor(color);
    setCarPrice(price);

    setNewCarBrand(brand);
    setNewCarModel(model);
    setNewCarColor(color);
    setNewCarPrice(price);
  };

  return (
    <>
      {cards.map((card: Car) => (
        <div key={card.id} className="card-wrapper">
          <div className="card__img-wrapper">
            <img
              src={`https://www.carlogos.org/car-logos/${card.brand.toLocaleLowerCase()}-logo.png`}
              className="card__img"
              alt="car"
            />
          </div>
          <div className="card-info">
            <div className="card__title">{card.brand}</div>
            <div className="card__description">{card.model}</div>
            <div className="card__data">{card.color}</div>
            <div className="card__price">€{card.price}</div>
            <div className="card-buttons">
              <button
                className="button-edit"
                onClick={() =>
                  handleEdit(
                    card.id,
                    card.brand,
                    card.model,
                    card.color,
                    card.price
                  )
                }
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="button-delete"
                data-car-id={card.id}
              >
                Delete
              </button>
            </div>
            <div className="card__timestamp">
              created{" "}
              {formatDistance(parseISO(card.createdAt), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      ))}
      <div className="edit-box" style={{ display: `${editVisibility}` }}>
        <form
          className="input-form"
          onSubmit={() => {
            // e.preventDefault();

            axios
              .put("http://localhost:3001/cars/" + carId, {
                brand: newCarBrand,
                model: newCarModel,
                color: newCarColor,
                price: newCarPrice,
              })
              .then(() => {
                setCarId(-1);
                // window.location.reload();
              });

            setEditVisibility("none");
          }}
        >
          <h2>EDIT CAR</h2>
          <input
            type="text"
            className="new-title-input"
            value={carBrand}
            onChange={(e) => {
              setNewCarBrand(e.target.value);
              setCarBrand(e.target.value);
            }}
          />
          <input
            type="text"
            className="new-descr-input"
            value={carModel}
            onChange={(e) => {
              setNewCarModel(e.target.value);
              setCarModel(e.target.value);
            }}
          />
          <input
            type="text"
            className="new-detail-input"
            value={carColor}
            onChange={(e) => {
              setNewCarColor(e.target.value);
              setCarColor(e.target.value);
            }}
          />
          <input
            type="text"
            className="new-price-input"
            value={carPrice}
            onChange={(e) => {
              setNewCarPrice(e.target.value);
              setCarPrice(e.target.value);
            }}
          />
          <button className="button-add">SAVE</button>
        </form>
      </div>
    </>
  );
};

export default Cards;
