import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7">
        Create Listings
      </h1>
      <form className="flex flex-col sm:flex-row">
        <div className=" flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border flex flex-col p-3 rounded-lg"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="border flex flex-col p-3 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="border flex flex-col p-3 rounded-lg"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
                required
              />
              <span>Beds</span>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
