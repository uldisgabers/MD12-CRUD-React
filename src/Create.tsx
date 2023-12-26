import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Create = () => {
  const queryClient = useQueryClient();

  type NewCar = {
    brand: string;
    model: string;
    color: string;
    price: string;
  };

  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    color: "",
    price: "",
  });

  const { mutateAsync: addCar } = useMutation({
    mutationFn: (payload: NewCar) => {
      return axios.post("http://localhost:3001/car", {
        ...payload,
        createdAt: new Date(),
        img: "no image",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      setNewCar({
        brand: "",
        model: "",
        color: "",
        price: "",
      });
    },
  });

  return (
    <div className="add-new-box">
      <h2>Add new</h2>
      <form
        className="input-form"
        onSubmit={(e) => {
          e.preventDefault();
          addCar(newCar);
        }}
      >
        <input
          type="text"
          className="new-title-input"
          placeholder="Brand"
          required
          name="brand"
          value={newCar.brand}
          onChange={(e) => {
            setNewCar({ ...newCar, brand: e.target.value });
          }}
        />
        <input
          type="text"
          className="new-descr-input"
          placeholder="Model"
          required
          name="model"
          value={newCar.model}
          onChange={(e) => {
            setNewCar({ ...newCar, model: e.target.value });
          }}
        />
        <input
          type="text"
          className="new-detail-input"
          placeholder="Color"
          required
          name="color"
          value={newCar.color}
          onChange={(e) => {
            setNewCar({ ...newCar, color: e.target.value });
          }}
        />
        <input
          type="text"
          className="new-price-input"
          placeholder="Price eur"
          required
          name="price"
          value={newCar.price}
          onChange={(e) => {
            setNewCar({ ...newCar, price: e.target.value });
          }}
        />
        <button className="button-add">Add</button>
      </form>
    </div>
  );
};

export default Create;
