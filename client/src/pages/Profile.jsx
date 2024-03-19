import { useState, useEffect, useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
  signInStart,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFail,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import UserListings from "../components/UserListings.jsx";

const Profile = () => {
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [viewListingsError, setViewListingsError] = useState(false);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [isViewListings, setIsViewListings] = useState([]);
  // const [openCloseListings, setOpenCloseListings] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; //To set unique file name to avoid uploading multiple files with same names
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFail(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setSuccessMessage(true);
    } catch (error) {
      dispatch(updateUserFail(error.message));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFail(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFail(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch("/api/auth/signout");

      const data = res.json();

      if (data.success === false) {
        dispatch(signOutUserFail(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFail(error.message));
    }
  };

  const handleViewListings = async () => {
    try {
      setViewListingsError(false);
      const res = await fetch(`/api/user/getlistings/${currentUser._id}`);

      const data = await res.json();
      setIsViewListings(data);

      if (data.success === false) {
        setViewListingsError(true);
        return;
      }
    } catch (error) {
      setViewListingsError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleUpdateFormSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error uploading image! (Image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image uploaded successfully!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg "
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg "
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
        />

        <button
          disabled={isLoading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 text-center"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer hover:opacity-95"
        >
          Delete account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer hover:opacity-95"
        >
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5 text-center">{error ? error : ""}</p>
      <p className="text-green-700 text-center">
        {successMessage ? "User updated successfully" : ""}
      </p>
      <div className="text-center">
        <button onClick={handleViewListings} className="text-green-700 ">
          View Listings
        </button>
        <p className="text-red-700 text-center mt-5">
          {viewListingsError ? "Error viewing listings" : ""}
        </p>
      </div>
      {isViewListings && isViewListings.length > 0 && (
        <UserListings
          isViewListings={isViewListings}
          setIsViewListings={setIsViewListings}
        />
      )}
    </div>
  );
};

export default Profile;
