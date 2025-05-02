
// ***********************************************
// componentes da pagina de gestao do Menu (manager)


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddMenu() {
  const navigate = useNavigate();
  const [plateName, setPlateName] = useState(""); // Plate name
  const [price, setPrice] = useState(""); // Price
  const [category, setCategory] = useState(""); // Category selector
  const [photo, setPhoto] = useState(null); // Uploaded photo

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]); // Store the uploaded photo
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!plateName || !price || !category || !photo) {
      alert("Please fill out all fields and upload a photo.");
      return;
    }
    try {
      // Step 1: Send the photo
      const formData = new FormData();
      formData.append("photo", photo);
      const photoResponse = await fetch(
        "http://localhost:3010/menuGestor/photo",
        {
          method: "POST",
          body: formData,
        }
      );
      const { photoUrl } = await photoResponse.json();
      if (!photoResponse.ok) {
        alert("Failed to upload photo.");
        return;
      }
      // Step 2: Send plate data
      console.log(plateName);
      console.log(price);
      console.log(category);
      console.log(photoUrl);

      const plateResponse = await fetch(
        "http://localhost:3010/menuGestor/data",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plateName, price, category, photoUrl }),
        }
      );

      const plateResult = await plateResponse.json();
      console.log("Plate data upload successful:", plateResult);

      if (!plateResponse.ok) {
        alert("Failed to upload plate data.");
        return;
      }
      // Success message
      alert("Plate and photo uploaded successfully!");
      setPlateName("");
      setPrice("");
      setCategory("");
      setPhoto(null);
    } catch (error) {
      console.error("Error uploading data or photo:", error);
      alert("An error occurred while uploading.");
    }
  };

  return (
    <section>  
    <form onSubmit={handleSubmit}>
      <h1>Hi Chief</h1>
        <h2>Start adding or removing plates from the Menu</h2>
        <h3>
        <div>
          <label htmlFor="plateName">Plate Name: </label>
          <input id="plateName" name="plateName"
            type="text"
            value={plateName}
            onChange={(e) => setPlateName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price: </label>
          <input id="Price" name="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category: </label>
          <select id="Category" name="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="starter">Starter</option>
            <option value="main">Main Course</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        <div>
          <label>Upload Photo: </label>
          <input type="file" onChange={handlePhotoChange} required />
        </div>

        <button type="submit">Add Plate</button>
      </h3>
    </form>

    <Link to="/menu"> <button>Show Menu</button> </Link>
    <Link to="/kitchen"><button>Kitchen - Current orders</button></Link>
    <Link to="/"> <button>Return to Homepage</button> </Link>
    </section>
  );
}

