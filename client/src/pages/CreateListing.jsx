import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase.js";
import { FaLeaf } from "react-icons/fa";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  console.log(formData);

  const handleImageSubmit = () => {
    //promises because there is more than one files and
    // it will upload 1 by 1 (more than one synchronus behaviour) we have to wait for that
    //images to upload
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setIsUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setIsUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload fail (2 mb max per image)");
          setIsUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setIsUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => {
            resolve(downloadURl);
          });
        }
      );
    });
  };

  const handleDeleteImage = (url) => {
    setFormData((prevState) => ({
      ...prevState,
      imageUrls: prevState.imageUrls.filter((imageUrl) => imageUrl !== url),
    }));
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 ">
        <div className="flex flex-col  gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg "
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg "
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg "
            id="address"
            maxLength="62"
            minLength="10"
            required
          />
          <div className="flex flex-wrap gap-6 ">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking spot" className="w-5" />
              <span>Parking spot</span>
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
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg "
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg "
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
              />
              <p>Bath</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg "
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular price </p>
                <span className="text-xs">($/Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg "
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted price </p>
                <span className="text-xs">($/Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1 ">
          <p className="font-semibold ">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />

            <button
              type="button"
              onClick={handleImageSubmit}
              disabled={isUploading} // Disable button while uploading
              className={`p-3 border rounded w-24 ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "border-green-700 text-green-700 hover:shadow-lg"
              }`}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-xs">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing-image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(url)}
                  className="p-3 text-red-700 rounded-lg hover:opacity-95 disabled:opacity-80"
                >
                  Delete
                </button>
              </div>
            ))}

          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
