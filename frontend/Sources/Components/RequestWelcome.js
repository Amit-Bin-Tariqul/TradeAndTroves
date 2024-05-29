
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RequestWelcome = () => {
  const { id } = useParams();
  const [prod, setProduct] = useState(null);
  const [productImage, setProductImage] = useState([]);
  const navigate = useNavigate();
  const [userAmount, setUserAmount] = useState(0);
  const getEmail = localStorage.getItem("emailData");
  const [activeImg, setActiveImage] = useState(productImage[0]);

  const renderStars = () => {
    const fullStars = Math.floor(4.5);
    const hasHalfStar = 4.5 % 1 !== 0;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    return stars;
  };

  const gotoSeller = () => {
    navigate("/SellerProfile", { state: { em: prod.SellerEmail } });
  };

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`/getRequestDetails?id=${id}`);
      if (response.data.user) {
        setProduct(response.data.user);

        console.log(prod)

        const imageUrl1 = `/uploads/${response.data.user.Image1}`;
        const imageUrl2 = `/uploads/${response.data.user.Image2}`;
        const imageUrl3 = `/uploads/${response.data.user.Image3}`;
        setProductImage([imageUrl1, imageUrl2, imageUrl3]);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);


  // const handleIncrementAmount = () => {
  //   if (userAmount < prod.Quantity) {
  //     setUserAmount(userAmount + 1);
  //   } else {
  //     alert("Not this much available");
  //   }
  // };

  // const handleDecrementAmount = () => {
  //   if (userAmount > 0) {
  //     setUserAmount(userAmount - 1);
  //   } else {
  //     setUserAmount(0);
  //   }
  // };

  const handleAddProducts = async () => {
    if (getEmail) {
      const requestData = {
        PID: prod.PID,
        SellerEmail: prod.SellerEmail,
        ProductName: prod.ProductName,
        Company: prod.Company,
        Model: prod.Model,
        RAM: prod.RAM,
        ROM: prod.ROM,
        FrontCamera: prod.FrontCamera,
        RearCamera: prod.RearCamera,
        Battery: prod.Battery,
        Description: prod.Description,
        IsWorkingProperly: prod.IsWorkingProperly,
        Price: prod.Price,
        Quantity: prod.Quantity,
        CourierOption: prod.CourierOption,
        Location: prod.Location,
        PhoneNumber: prod.PhoneNumber,
        Image1: prod.Image1,
        Image2: prod.Image2,
        Image3: prod.Image3,
        usedMnth:prod.usedMnth
        // Add any other necessary fields here
      };
  
      try {
        const response = await axios.post(
          "http://localhost:3002/RequestWelcomebhai",
          requestData
        );
        if (response.status === 200) {
          alert("Product added to the Database successfully.");
          navigate("/Home");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      navigate("/TogglePage2");
    }
  };
  

  // const handleBuyNowClick = () => {
  //   if (prod) {
  //     navigate("/ProductBuy", {
  //       state: {
  //         productId: id,
  //         productName: prod.ProductName,
  //         price: prod.Price,
  //         quantity: prod.Quantity,
  //         image: productImage[0],
  //         amount: userAmount,
  //       },
  //     });
  //   }
  // };

  if (!prod) {
    return (
      <div className="text-center text-xl font-semibold">
        Loading product data...
      </div>
    );
  }

  // const date = new Date(prod.HarvestDate);
  // const year = date.getFullYear();
  // const month = (date.getMonth() + 1).toString().padStart(2, "0");
  // const day = date.getDate().toString().padStart(2, "0");
  // const formattedDate = `${year}-${month}-${day}`;

  const handleSmallImageClick = (image) => {
    setActiveImage(image);
  };

  return (
    <div className="flex justify-center space-x-6 p-6 bg-gradient-to-r from-blue-200 to-green-100">
      <div className="w-2/3 mr-6 my-4">
        <div className="text-center">
          <div className="flex flex-col gap-3 lg:w-3/4 mx-16">
            <img
              src={activeImg || productImage[0]}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl transition-transform transform scale-100 hover:scale-105"
            />
            <div className="flex flex-row justify-between h-24">
              {productImage.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className={`w-24 h-24 rounded-md cursor-pointer transition-transform transform scale-100 hover:scale-110 ${activeImg === image ? "scale-105" : ""
                    }`}
                  onClick={() => handleSmallImageClick(image)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4">
        <div className="bg-pink p-4 rounded shadow-md my-4 mx-0        transition-transform transform scale-100 hover:scale-105 ">
          <h2 className="text-3xl font-semibold">{prod.ProductName}</h2>
          {/* <p className="text-base mb-2">Id: {id}</p> */}
          <p className="text-base mb-2"><b>{prod.Model}</b></p>
          <p className="text-base mb-2">Unit Price: ${prod.Price}</p>
          <p className="text-base mb-2">Amount: {prod.Quantity}</p>

          <div className="flex items-center text-base mb-4">
            <span className="mr-2"></span>
            <img src="/images/ram.jpg" alt="RAM Icon" className="w-6 h-6 mr-2" />
            <span>{prod.RAM} </span>
          </div>

          <div className="flex items-center text-base mb-4">
            <span className="mr-2"></span>
            <img src="/images/rom.png" alt="ROM Icon" className="w-6 h-6 mr-2" />
            <span>{prod.ROM} </span>
          </div>
          <div className="flex items-center text-base mb-4 ">
            <span className="mr-2"></span>
            <img src="/images/frontcam.png" alt="Front Camera Icon" className="w-6 h-6 mr-2" />
            <span>{prod.FrontCamera}</span>
          </div>

          <div className="flex items-center text-base mb-4">
            <span className="mr-2"></span>
            <img src="/images/camera.png" alt="Rear Camera Icon" className="w-6 h-6 mr-2" />
            <span>{prod.RearCamera}</span>
          </div>
          <div className="flex items-center text-base mb-4">
            <span className="mr-2"></span>
            <img src="/images/battery.png" alt="Rear Camera Icon" className="w-6 h-6 mr-2" />
            <span>{prod.Battery}</span>
          </div>


          <p className="text-sm text-gray-600">Is Working Properly: {prod.IsWorkingProperly}</p>
          <p className="text-sm text-gray-600">
            Issues: {prod.Issues ? prod.Issues : 'N/A'}
          </p>

          <p className="text-lg text-gray-600">Courier Option: {prod.CourierOption}</p>
          <p className="text-lg text-gray-600">Location: {prod.Location}</p>
          {/* <p className="text-base mb-2">Harvest Date: {formattedDate}</p> */}
          <p className="text-lg text-gray-600">Used : {prod.usedMnth} months</p>
          <div className="flex items-center text-base mb-4 ">
            <span className="mr-2">Ratings:</span>
            <div className="text-yellow-500"> {renderStars()} 4.5</div>
          </div>

          {/* <div className="flex items-center text-base mb-4">
            <span className="mr-2">Amount: </span>
            <button
              className="bg-red-400 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-l my-1"
              onClick={handleDecrementAmount}
            >
              -
            </button>
            <input
              type="number"
              className="bg-blue-100 text-center w-14 mx-2  py-2 px-2 rounded-r-l border border-blue-100 "
              value={userAmount}
              onChange={(e) => setUserAmount(e.target.value)}
            />
            <button
              className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-r my-1"
              onClick={handleIncrementAmount}
            >
              +
            </button>
          </div> */}

          <div className="flex mb-2">
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-8"
              onClick={handleBuyNowClick}
            >
              Buy Now
            </button> */}
            <button
              className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={handleAddProducts}
            >
              Add to Products
            </button>
          </div>
          {/* <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={gotoSeller}
          >
            ☞ Get Seller Details
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default RequestWelcome;
