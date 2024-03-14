/* eslint-disable react/prop-types */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { UserContext } from "./UserContext";

function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      mobile,
      name,
      place: place._id,
      price: numberOfDays * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`https://airbnb-organichousebooking-4-client.onrender.com/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per day
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <br />
            <input
              type="date"
              value={checkIn}
              onChange={(eve) => setCheckIn(eve.target.value)}
            />
          </div>

          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <br />
            <input
              type="date"
              value={checkOut}
              onChange={(eve) => setCheckOut(eve.target.value)}
            />
          </div>
        </div>

        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(eve) => setNumberOfGuests(eve.target.value)}
          />
        </div>

        {numberOfDays > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(eve) => setName(eve.target.value)}
            />

            <label>Phone Number:</label>
            <input
              type="tel"
              value={mobile}
              onChange={(eve) => setMobile(eve.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfDays > 0 && <span> ${numberOfDays * place.price}</span>}
      </button>
    </div>
  );
}

export default BookingWidget;
