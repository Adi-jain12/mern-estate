import { Link } from "react-router-dom";

const UserListings = ({ isViewListings, setIsViewListings }) => {
  // console.log("isViewListings", isViewListings);

  const handleDeleteListing = async (listingId) => {
    const res = await fetch(`api/listing/deleteListing/${listingId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success === false) {
      return;
    }

    setIsViewListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
  };

  // const handleEditListing = async (listingId) => {
  //   const res = await fetch(`api/listing/editListing/${listingId}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(res),
  //   });

  //   const data = await res.json();
  // };

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
            <button
              onClick={() => handleDeleteListing(list._id)}
              className="text-white uppercase bg-red-500 rounded-lg p-1 hover:opacity-75"
            >
              <span>Delete</span>
            </button>

            <Link to={`/update-listing/${list._id}`}>
              <button
                // onClick={() => handleEditListing(list._id)}
                className="text-green-700 uppercase rounded-lg p-1 hover:opacity-75"
              >
                <span>Edit</span>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserListings;
