import { formatDistance, parseISO } from "date-fns";
import { NavLink } from "react-router-dom";
import { Car } from "../../pages/Cars/Cars";

type CardProps = {
  card: Car;
  onDelete: () => void;
  onEdit: () => void;
};

const Card = ({ card, onDelete, onEdit }: CardProps) => {
  return (
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
          <button className="button-edit" onClick={onEdit}>
            Edit
          </button>
          <button
            onClick={onDelete}
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
        <NavLink to={`/car/${card.id}`}>See more</NavLink>
      </div>
    </div>
  );
};

export default Card;
