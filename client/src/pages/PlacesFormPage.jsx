/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";

const PlacesFormPage = () => {
  const { id } = useParams();
  console.log({ id });
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirectToPlacesList, setRedirectToPlacesList] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;

      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);


  const { action } = useParams();

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(eve) {
    eve.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      //update the place
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirectToPlacesList(true);
    } else {
      //new place
      await axios.post("/places", placeData);
      setRedirectToPlacesList(true);
    }
  }

  if (redirectToPlacesList && action !== "new") {
    return <Navigate to={"https://airbnb-organichousebooking-4-client.onrender.com/account/places"} />;
  }

  return (
    <div>
      {/* Above tags to "title" option  */}
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput("Title", "Title for your place should be short and catchy")}
        <input
          type="text"
          value={title}
          onChange={(eve) => setTitle(eve.target.value)}
          placeholder="title,  for example: My lovely house"
        />

        {preInput("Address", "Address to your place")}
        <input
          type="text"
          value={address}
          onChange={(eve) => setAddress(eve.target.value)}
          placeholder="address"
        />

        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Description of new places")}

        <textarea
          value={description}
          onChange={(eve) => setDescription(eve.target.value)}
        />

        {/* checkbox types (perks) */}
        {preInput("Perks", "select all the perks of your places")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {/* extra info */}

        <h2 className="text-2xl mt-4">Extra Info</h2>
        <p className="text-gray-500 text-sm">House rules, etc...</p>
        <textarea
          value={extraInfo}
          onChange={(eve) => setExtraInfo(eve.target.value)}
        />

        {/* check in and check out times */}
        <h2 className="text-2xl mt-4">Check in&out times</h2>
        <p className="text-gray-500 text-sm">
          add check in and out times, remember to have some time window for
          cleaning the room between guests
        </p>

        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="12:00"
              value={checkIn}
              onChange={(eve) => setCheckIn(eve.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11"
              value={checkOut}
              onChange={(eve) => setCheckOut(eve.target.value)}
            />
          </div>
        </div>

        <div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              placeholder="5"
              value={maxGuests}
              onChange={(eve) => setMaxGuests(eve.target.value)}
            />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Price per day</h3>
            <input
              type="number"
              value={price}
              onChange={(eve) => setPrice(eve.target.value)}
            />
          </div>
        </div>

        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
