import React from "react";
import { Link } from "react-router-dom";

const UserListings = ({ isViewListings }) => {
  //   console.log("isViewListings", isViewListings);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center mt-7 text-2xl font-semibold">
        {" "}
        - Your Listings -
      </h1>
      {isViewListings.map((list) => (
        <div
          key={list._id}
          className="border gap-4 rounded-lg p-3 flex justify-between items-center"
        >
          <Link to={`/listing/${list._id}`}>
            <img
              src={list.imageUrls[0]}
              alt="listing cover"
              className="w-16 h-16 object-contain"
            />
          </Link>

          <Link
            className="text-slate-700  font-semibold hover:underline truncate flex-1"
            to={`/listing/${list._id}`}
          >
            <p>{list.name}</p>
          </Link>

          <div className="flex flex-col items-center">
            <button className="text-white uppercase bg-red-500 rounded-lg p-1 hover:opacity-75">
              <span>Delete</span>
            </button>

            <button className="text-green-700 uppercase rounded-lg p-1 hover:opacity-75">
              <span>Edit</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserListings;
