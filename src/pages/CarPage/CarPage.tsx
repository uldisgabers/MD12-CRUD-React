import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Car } from "../Cars/Cars";
import style from "./CarPage.module.css";
import { useNavigate, useParams } from "react-router-dom";

const CarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: car, isLoading: loading } = useQuery({
    queryKey: ["cars", id],
    queryFn: () => {
      return axios
        .get(`http://localhost:3001/car/${id}`)
        .then<Car>(({ data }) => {
          return data.data[0];
        })
        .catch((e) => {
          if (e.response.status === 404) {
            navigate("/404");
          }
        });
    },
    
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {!car || loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={style.wrapper}>
                <img
                  src={`https://www.carlogos.org/car-logos/${car.brand.toLocaleLowerCase()}-logo.png`}
                  className="card__img"
                  alt="car"
                />
                <h1 className={style.brand}>{car.brand}</h1>
                <p className={style.model}>{car.model}</p>
                <p>{car.color}</p>
                <p className={style.price}>Eur: {car.price}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarPage;
