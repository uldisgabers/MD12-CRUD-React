import axios from "axios";
import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Create from "../../Create";
import Card from "../../components/Card/Card";
import { useGetCars } from "./hooks/useGetCars";
import { useDeleteCar } from "./hooks/useDeleteCar";

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
  const queryClient = useQueryClient();

  const { data: carsArray, isLoading: loading } = useGetCars()

  const { mutateAsync: handleDelete, isPending: addCarLoading } = useDeleteCar()

  const { mutateAsync: handleEditMutation, isPending: editCarLoading } =
    useMutation({
      mutationFn: () => {
        return axios
          .put("http://localhost:3001/cars/" + carId, {
            brand: newCarBrand,
            model: newCarModel,
            color: newCarColor,
            price: newCarPrice,
          })
          .then(() => {
            setCarId(-1);
          });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cars"] });
        setEditVisibility("none");
      },
    });

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

  if (loading || addCarLoading || editCarLoading) {
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
        {!carsArray || loading || editCarLoading ? (
          <p>loading...</p>
        ) : (
          <>
            <Create />
            {carsArray.map((card: Car) => (
              <Card
                key={card.id}
                card={card}
                onDelete={() => {
                  handleDelete(card.id);
                }}
                onEdit={() => {
                  handleEdit(
                    card.id,
                    card.brand,
                    card.model,
                    card.color,
                    card.price
                  );
                }}
              />
            ))}
            <div className="edit-box" style={{ display: `${editVisibility}` }}>
        <form
          className="input-form"
          onSubmit={() => {
            handleEditMutation();
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
        )}
      </div>
      
    </>
  );
};

export default Cars;
