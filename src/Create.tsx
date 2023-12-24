import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Car } from "./pages/Cars/Cars";

const Create = () => {

  // const queryClient = new QueryClient();

  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    color: "",
    price: "",
    createdAt: new Date(),
    img: "img"
  });

  // const handleSubmit = () => {
  //   // e.preventDefault();
  //   // const card = { brand, model, color, price };

  //   axios
  //     .post("http://localhost:3001/car", {
  //       ...newCar,
  //       createdAt: new Date(),
  //       img: "no image",
  //     })
  //     .then(() => {
  //       setNewCar({
  //         brand: "",
  //         model: "",
  //         color: "",
  //         price: "",
  //       });
  //       window.location.reload();
  //     });
  // };

  const { mutateAsync: addCar, isPending: addCarLoading } = useMutation({
    mutationFn: (payload: Car) => {
      return axios.post("http://localhost:3001/car", {
            ...newCar,
            createdAt: new Date(),
            img: "no image",
          })
        // payload
        // ...payload,
        // createdAt: new Date(),
        // img: "no image"
      // });
    },
    onSuccess: () => {
      // Invalidate and refetch
      console.log(payload)
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  return (
    <div className="add-new-box">
      <h2>Add new</h2>
      <form
        className="input-form"
        // onSubmit={(e) => {
        //   addCar(newCar)
        // }}
      >
        <input
          type="text"
          className="new-title-input"
          placeholder="Brand"
          required
          name="brand"
          value={newCar.brand}
          // onChange={(e) => setBrand(e.target.value)}
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
          // onChange={(e) => setModel(e.target.value)}
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
          // onChange={(e) => setColor(e.target.value)}
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
          // onChange={(e) => setPrice(e.target.value)}
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
