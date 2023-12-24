import { formatDistance, parseISO } from "date-fns";
import axios from "axios";
import { useState } from "react";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Create from "../../Create";
import { NavLink } from "react-router-dom";
import Card from "../../components/Card/Card";

export type Car = {
  id: number;
  img: string;
  brand: string;
  model: string;
  color: string;
  price: string;
  createdAt: string;
};

const Cars = () => {

  const queryClient = useQueryClient()

  const { data: carsArray, isLoading: loading } = useQuery({
    queryKey: ["cars"],
    queryFn: () => {
      return axios.get("http://localhost:3001/cars").then(({ data }) => {
        return data.cars;
      });
    },
    // staleTime: Infinity,
  });

  // const handleDelete = (carId: number) => {
  //   axios.delete("http://localhost:3001/cars/" + carId).then(() => {
  //     window.location.reload();
  //   });
  // };

  const { mutateAsync: handleDelete, isPending: addCarLoading } = useMutation({
    mutationFn: (payload: number) => {
      return axios.delete("http://localhost:3001/cars/" + payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["cars"]})
    }
  })



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

  if (loading || addCarLoading) {
    return <h1>Loading...</h1>;
  }

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
      <div className="cards">
        {!carsArray || loading ? (
          <p>loading...</p>
        ) : (
          carsArray.map((card: Car) => (
            
              <Card
                key={card.id}
                card={card}
                onDelete={() => {
                  handleDelete(card.id)
                }}
                onEdit={() => {
                  handleEdit(
                    card.id,
                    card.brand,
                    card.model,
                    card.color,
                    card.price
                  )
                }}
              />
              // {/* <div key={card.id} className="card-wrapper">
              //   <div className="card__img-wrapper">
              //     <img
              //       src={`https://www.carlogos.org/car-logos/${card.brand.toLocaleLowerCase()}-logo.png`}
              //       className="card__img"
              //       alt="car"
              //     />
              //   </div>
              //   <div className="card-info">
              //     <div className="card__title">{card.brand}</div>
              //     <div className="card__description">{card.model}</div>
              //     <div className="card__data">{card.color}</div>
              //     <div className="card__price">€{card.price}</div>
              //     <div className="card-buttons">
              //       <button
              //         className="button-edit"
              //         onClick={() =>
              //           handleEdit(
              //             card.id,
              //             card.brand,
              //             card.model,
              //             card.color,
              //             card.price
              //           )
              //         }
              //       >
              //         Edit
              //       </button>
              //       <button
              //         onClick={() => handleDelete(card.id)}
              //         className="button-delete"
              //         data-car-id={card.id}
              //       >
              //         Delete
              //       </button>
              //     </div>
              //     <div className="card__timestamp">
              //       created{" "}
              //       {formatDistance(parseISO(card.createdAt), new Date(), {
              //         addSuffix: true,
              //       })}
              //     </div>
              //     <NavLink to={`/car/${card.id}`}>See more</NavLink>
              //   </div>
              // </div> */}
            
          ))
        )}
      </div>
      <div className="edit-box" style={{ display: `${editVisibility}` }}>
        <form
          className="input-form"
          onSubmit={() => {
            axios
              .put("http://localhost:3001/cars/" + carId, {
                brand: newCarBrand,
                model: newCarModel,
                color: newCarColor,
                price: newCarPrice,
              })
              .then(() => {
                setCarId(-1);
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
      <Create />
    </>
  );
};

export default Cars;
