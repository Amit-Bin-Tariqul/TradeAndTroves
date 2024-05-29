// ProductDataForm.js
import React, { useState } from "react";
import "./ProductData.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDataForm = () => {
  const [productName, setProductname] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cropBreed, setCropBreed] = useState("");
  const [harvestDate, setHarvestDate] = useState("2023-01-01");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleProductData = async (e) => {
    e.preventDefault();

    if (unitPrice <= 0) {
      setError("Unit price is invalid.");
    } else if (quantity <= 0) {
      setError("Quantity is invalid.");
    } else if (selectedFiles.length !== 3) {
      setError("You must upload 3 files.");
    } else {
      try {
        const formData = new FormData();
        formData.append("productName_", productName);
        formData.append("sellerName_", sellerName);
        formData.append("sellerEmail_", sellerEmail);
        formData.append("description_", description);
        formData.append("unitPrice_", unitPrice);
        formData.append("quantity_", quantity);
        formData.append("cropBreed_", cropBreed);
        formData.append("harvestDate_", harvestDate);

        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("images", selectedFiles[i]);
        }

        const response = await axios.post("http://localhost:3002/ProductDataForm", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        console.log("Success");
        navigate("/");
      } catch (err) {
        if (err.response && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("");
        }
      }
    }
  };

  const handleFileSelect = (event) => {
    const selectedFilesArray = Array.from(event.target.files);
    setSelectedFiles(selectedFilesArray);
  };

  return (
    <div className="product-form-container">
      <center>
        <h2>Product Entry</h2>
        <div className="error-message">{error}</div>
        <form onSubmit={handleProductData} encType="multipart/form-data">
          <div className="form-group">
            <div className="input-container">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductname(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                className="form-control"
                placeholder="Seller's Name"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="email"
                className="form-control"
                placeholder="Seller's Email"
                value={sellerEmail}
                onChange={(e) => setSellerEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="number"
                className="form-control"
                placeholder="Unit Price"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                className="form-control"
                placeholder="Crop Breed"
                value={cropBreed}
                onChange={(e) => setCropBreed(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="date"
                className="form-control"
                placeholder="Harvest Date"
                value={harvestDate}
                min="2023-01-01"
                max="2023-12-31"
                onChange={(e) => setHarvestDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="file-input-container">
            <label htmlFor="file-upload" className="file-upload-label">
            <i class="fa-sharp fa-solid fa-rectangle-history-circle-plus fa-xl" style={{ color: '#07501d' }}></i>
              Upload 3 Product Images
              
              <div className="file-upload-icon">+</div>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              multiple
              required
              style={{ display: "none" }}
            />
            <div className="selected-files-list">
              {selectedFiles.map((file, index) => (
                <div key={index} className="selected-file-item">
                  {file.name}
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Submit Product
          </button>
        </form>
      </center>
    </div>
  );
};

export default ProductDataForm;
