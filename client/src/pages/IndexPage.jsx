/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((res) => {
      setPlaces(res.data);
    });
  });
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"https://airbnb-organichousebooking-4-client.onrender.com/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="text-sm truncate leading-4">{place.title}</h2>
            <h3 className="font-bold leading-4">{place.address}</h3>

            <div className="mt-2">
              <span className="font-bold">${place.price}</span> per day
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
