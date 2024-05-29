import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const companyData = [
  { name: 'Apple', logo: '/images/apple.jpg', models: ['iPhone 11', 'iPhone 12', 'iPhone 13'] },
  { name: 'Samsung', logo: '/images/samsaung.jpg', models: ['Galaxy S21', 'Galaxy S22'] },
  { name: 'Xiaomi', logo: '/images/xiomi.jpg', models: ['Note 10', 'Note 11'] },
  { name: 'OnePlus', logo: '/images/oneplus.jpg', models: ['Pixel 5', 'Pixel 6'] },
  // Add more companies with logos and models
];


function MobileSell() {
  const em=localStorage.getItem("emailData");
  const [images, setImages] = useState([]);
  const [modelToSell,setModelToSell] = useState({});
  const [email, setEmail] = useState(em);
  const [Price,setPrice]= useState(1000)
  const navigate= useNavigate();
  const [mobileInfo, setMobileInfo] = useState({
    company: '',
    model: '',
    description: '',
    isWorkingProperly: '',
    issues: '',
    price: Price,
    termsAgreed: false,
    courierOption: '',
    location: '',
    phoneNumber: '',
    usedMnth:'',
  });

  const [suggestedModelInfo, setSuggestedModelInfo] = useState({
    ram: '',
    rom: '',
    rearCamera: '',
    frontCamera: '',
    battery: '',
  });

  function getSuggestedModelInfo(modelName) {
    // Define a mapping of model names to their respective info
    const modelInfoMap = {
      'iPhone 11': { ram: '4GB', rom: '64GB', rearCamera: '12MP', frontCamera: '12MP', battery: '3110mAh' },
      'iPhone 12': { ram: '4GB', rom: '64GB', rearCamera: '12MP', frontCamera: '12MP', battery: '2815mAh' },
      'iPhone 13': { ram: '4GB', rom: '128GB', rearCamera: '12MP', frontCamera: '12MP', battery: '3095mAh' },
      'Galaxy S21': { ram: '8GB', rom: '128GB', rearCamera: '12MP', frontCamera: '10MP', battery: '4000mAh' },
      'Galaxy S22': { ram: '8GB', rom: '256GB', rearCamera: '50MP', frontCamera: '12MP', battery: '4500mAh' },
      'Pixel 5': { ram: '8GB', rom: '128GB', rearCamera: '16MP', frontCamera: '8MP', battery: '4080mAh' },
      'Pixel 6': { ram: '8GB', rom: '128GB', rearCamera: '50MP', frontCamera: '8MP', battery: '4600mAh' },
      // Add more models with their info
    };

    return modelInfoMap[modelName] || {}; // Return the info if available, or an empty object
  }

  const [showCompanyQuestion, setShowCompanyQuestion] = useState(true);
  const [showModelSelection, setShowModelSelection] = useState(false);
  const [showConditionQuestion, setShowConditionQuestion] = useState(false);
  const [showPriceInput, setShowPriceInput] = useState(false);

  const handleCompanySelect = (companyName) => {
    setMobileInfo({ ...mobileInfo, company: companyName });
    setShowCompanyQuestion(false);
    setShowModelSelection(true);
  };

  const handleModelSelect = (modelName) => {

    setModelToSell(modelName);
    //console.log(modelToSell);
    setMobileInfo({ ...mobileInfo, model: modelName });
    // Suggest the model info based on the selected model
    const suggestedModel = companyData
      .find((company) => company.name === mobileInfo.company)
      .models.find((model) => model === modelName);
    setSuggestedModelInfo({ ...suggestedModelInfo, ...getSuggestedModelInfo(suggestedModel) });

    setShowModelSelection(false);
    setShowConditionQuestion(true);
  };

  useEffect(() => {
    console.log(modelToSell);
  }, [modelToSell]);



  const getCompanyLogo = (companyName) => {
    return companyData.find((company) => company.name === companyName)?.logo;
  };

  const getModelsByCompany = (companyName) => {
    return companyData.find((company) => company.name === companyName)?.models || [];
  };

  const getIssuesInput = (e) => {
    setMobileInfo({ ...mobileInfo, issues: e.target.value });
  };

  const handleConditionSelect = (condition) => {
    setMobileInfo({ ...mobileInfo, isWorkingProperly: condition });
    if (condition !== 'Yes') {
      setShowPriceInput(false);
    } else {
      setShowPriceInput(true);
    }
  };

  const handlePriceInput = (e) => {
    setMobileInfo({ ...mobileInfo, price: e.target.value });
  };

  const handleTermsAgreed = () => {
    setMobileInfo({ ...mobileInfo, termsAgreed: !mobileInfo.termsAgreed });
  };

  const handleCourierOption = (e) => {
    setMobileInfo({ ...mobileInfo, courierOption: e.target.value });
  };

  const handleLocationInput = (e) => {
    setMobileInfo({ ...mobileInfo, location: e.target.value });
  };
  const handleusedMnthInput = (e) => {
    setMobileInfo({ ...mobileInfo, usedMnth: e.target.value });
  };
  
  const handlePhoneNumberInput = (e) => {
    setMobileInfo({ ...mobileInfo, phoneNumber: e.target.value });
  };
  const handleImageUpload = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
    
  };
  

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };


  

  const handleSubmit =async() => {
    

    const formData = new FormData();
    formData.append("email",email);
    formData.append("productName","Mobile");
    formData.append("quantity",1);
    formData.append("company", mobileInfo.company);
    formData.append("model", mobileInfo.model);
    formData.append("ram", suggestedModelInfo.ram);
    formData.append("rom", suggestedModelInfo.rom);
    formData.append("frontCamera", suggestedModelInfo.frontCamera);
    formData.append("rearCamera", suggestedModelInfo.rearCamera);
    formData.append("battery", suggestedModelInfo.battery);
    formData.append("description", mobileInfo.description);
    formData.append("isWorkingProperly", mobileInfo.isWorkingProperly);
    formData.append("issues", mobileInfo.issues);
    formData.append("price", mobileInfo.price);
    formData.append("termsAgreed", mobileInfo.termsAgreed);
    formData.append("courierOption", mobileInfo.courierOption);
    formData.append("location", mobileInfo.location);
    formData.append("phoneNumber", mobileInfo.phoneNumber);
    formData.append("usedMnth",mobileInfo.usedMnth);
  
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
  
    try {
      // Make the API call
      const response = await axios.post("http://localhost:3002/MobileSellForm", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
  
      console.log("Success:", response.data);
      navigate('/Home');
      // Handle success, e.g., redirect to a success page or show a success message
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, show an error message, etc.
    }
    
  };



  const canProceedToSubmit =
    mobileInfo.termsAgreed &&
    mobileInfo.courierOption &&
    mobileInfo.location &&
    mobileInfo.phoneNumber;



  return (
    <div className="p-8 bg-white rounded shadow-lg">
       {/* <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Enter Your Email</h2>
        <input
          type="email"
          value={email}
          onChange={handleEmailInput}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div> */}
      {showCompanyQuestion && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">Which company is your phone from?</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {companyData.map((company, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 rounded border ${mobileInfo.company === company.name ? 'border-green-500' : 'border-gray-200'
                  } hover:bg-gray-100`}
                onClick={() => handleCompanySelect(company.name)}
              >
                <img src={company.logo} alt={company.name} className="w-16 h-16 mx-auto mb-2" />
                {company.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {showModelSelection && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Select your phone model</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {getModelsByCompany(mobileInfo.company).map((model, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 rounded border ${mobileInfo.model === model ? 'border-green-500' : 'border-gray-200'
                  } hover-bg-gray-100`}
                onClick={() => handleModelSelect(model)}
              >
                {model}
              </div>
            ))}
          </div>
        </div>
      )}
      {showConditionQuestion && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700 text-center">Does your phone work properly?</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            {['Yes', 'No', 'Sometimes', 'Yes, with some issues'].map((condition, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 rounded border ${mobileInfo.isWorkingProperly === condition ? 'border-green-500' : 'border-gray-200'
                  } hover-bg-gray-100`}
                onClick={() => handleConditionSelect(condition)}
              >
                {condition}
              </div>
            ))}
          </div>
        </div>
      )}

      {mobileInfo.isWorkingProperly === 'Yes' && showPriceInput && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Set a price for your mobile</h2>
          <input
            type="number"
            value={mobileInfo.price}
            onChange={handlePriceInput}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
      )}

      {mobileInfo.isWorkingProperly !== 'Yes' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Any issues with your device?</h2>
          <textarea
            value={mobileInfo.issues}
            onChange={getIssuesInput}
            className="border border-gray-300 rounded p-2 w-full h-16"
          />
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Courier Option</h2>
        <input
          type="text"
          value={mobileInfo.courierOption}
          onChange={handleCourierOption}
          className="border border-gray-300 rounded p-2 w-full h-16"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Location</h2>
        <input
          type="text"
          value={mobileInfo.location}
          onChange={handleLocationInput}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Used Month</h2>
        <input
          type="text"
          value={mobileInfo.usedMnth}
          onChange={handleusedMnthInput}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Phone Number</h2>
        <input
          type="text"
          value={mobileInfo.phoneNumber}
          onChange={handlePhoneNumberInput}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Upload 3 pictures</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div>
        <h6 className="text-xl font-semibold mb-4 text-center text-blue-700"></h6>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={mobileInfo.termsAgreed}
            onChange={handleTermsAgreed}
            className="form-checkbox h-5 w-5 text-blue-700"
          />
          <span className="ml-2 text-blue-700">I agree to the terms and conditions</span>
        </label>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className={`col-span-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${canProceedToSubmit ? '' : 'cursor-not-allowed'
          }`}
        disabled={!canProceedToSubmit}
      >
        Submit
      </button>
    </div>
  );


}

export default MobileSell;
