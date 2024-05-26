import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingCard from "../components/ListingCard.jsx";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-slate-700 font-semibold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500 ">Perfect</span> place
          <br />
          just a few clicks away
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Welcome to Lalit Estate, where finding your perfect home is our
          priority.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          className="text-xs sm:text-blue-800 font-bold hover:underline"
          to={"/search"}
        >
          Click here to explore today...
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing results for offer , sale , rent*/}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3 ">
              <h2 className="text-2xl font-semibold text-slate-600 ">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              <h1></h1>
              {offerListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 ">
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3 ">
              <h2 className="text-2xl font-semibold text-slate-600 ">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              <h1></h1>
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>{" "}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 ">
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3 ">
              <h2 className="text-2xl font-semibold text-slate-600 ">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              <h1></h1>
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
