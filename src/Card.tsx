import { formatDistance, parseISO } from "date-fns";
import axios from "axios";

const Card = (props) => {
  type Car = {
    id: number;
    img: string;
    brand: string;
    model: string;
    color: string;
    price: string;
    createdAt: string;
  };

  const cards = props.cards;

  const handleDelete = (carId: number) => {
    axios.delete("http://localhost:3004/cars/" + carId).then(() => {
      window.location.reload();
    });
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
              <button className="button-edit">Edit?</button>
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
    </>
  );
};

export default Card;
