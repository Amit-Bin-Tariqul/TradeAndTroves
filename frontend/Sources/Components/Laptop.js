import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const companyData = [
  { name: 'Acer', logo: '/images/acer.jpg', models: ['Aspire', 'Enduro', 'Swift'] },
  { name: 'Hp', logo: '/images/hp.jpg', models: ['Pavilion', 'Spectre','ChromeBook'] },
  { name: 'Dell', logo: '/images/dell.jpg', models: ['Inspiron', 'Vostro'] },
  { name: 'Asus', logo: '/images/asus.jpg', models: ['VivoBook', 'ZenBook'] },
  // Add more companies with logos and models
];


function LaptopSell() {
  const em=localStorage.getItem("emailData");
  const [images, setImages] = useState([]);
  const [modelToSell,setModelToSell] = useState({});
  const [email, setEmail] = useState(em);
  const [Price,setPrice]= useState(50000)
  const navigate= useNavigate();
  const [laptopInfo, setlaptopInfo] = useState({
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
        'Aspire': { ram: '8GB', rom: '256GB', rearCamera: 'N/A', frontCamera: '720p', battery: '45Wh' },
        'Enduro': { ram: '16GB', rom: '512GB', rearCamera: 'N/A', frontCamera: '1080p', battery: '52Wh' },
        'Swift': { ram: '16GB', rom: '1TB', rearCamera: 'N/A', frontCamera: '720p', battery: '56Wh' },
        'Pavilion': { ram: '12GB', rom: '1TB', rearCamera: 'N/A', frontCamera: '720p', battery: '41Wh' },
        'Spectre': { ram: '16GB', rom: '512GB', rearCamera: 'N/A', frontCamera: '1080p', battery: '60Wh' },
        'ChromeBook': { ram: '4GB', rom: '64GB', rearCamera: 'N/A', frontCamera: '720p', battery: '38Wh' },
        'Inspiron': { ram: '8GB', rom: '256GB', rearCamera: 'N/A', frontCamera: '720p', battery: '42Wh' },
        'Vostro': { ram: '8GB', rom: '512GB', rearCamera: 'N/A', frontCamera: '720p', battery: '48Wh' },
        'VivoBook': { ram: '16GB', rom: '1TB', rearCamera: 'N/A', frontCamera: '720p', battery: '50Wh' },
        'ZenBook': { ram: '16GB', rom: '512GB', rearCamera: 'N/A', frontCamera: '1080p', battery: '67Wh' },
        // Add more models with their info
      };
      

    return modelInfoMap[modelName] || {}; // Return the info if available, or an empty object
  }

  const [showCompanyQuestion, setShowCompanyQuestion] = useState(true);
  const [showModelSelection, setShowModelSelection] = useState(false);
  const [showConditionQuestion, setShowConditionQuestion] = useState(false);
  const [showPriceInput, setShowPriceInput] = useState(false);

  const handleCompanySelect = (companyName) => {
    setlaptopInfo({ ...laptopInfo, company: companyName });
    setShowCompanyQuestion(false);
    setShowModelSelection(true);
  };

  const handleModelSelect = (modelName) => {

    setModelToSell(modelName);
    //console.log(modelToSell);
    setlaptopInfo({ ...laptopInfo, model: modelName });
    // Suggest the model info based on the selected model
    const suggestedModel = companyData
      .find((company) => company.name === laptopInfo.company)
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
    setlaptopInfo({ ...laptopInfo, issues: e.target.value });
  };

  const handleConditionSelect = (condition) => {
    setlaptopInfo({ ...laptopInfo, isWorkingProperly: condition });
    if (condition !== 'Yes') {
      setShowPriceInput(false);
    } else {
      setShowPriceInput(true);
    }
  };

  const handlePriceInput = (e) => {
    setlaptopInfo({ ...laptopInfo, price: e.target.value });
  };

  const handleTermsAgreed = () => {
    setlaptopInfo({ ...laptopInfo, termsAgreed: !laptopInfo.termsAgreed });
  };

  const handleCourierOption = (e) => {
    setlaptopInfo({ ...laptopInfo, courierOption: e.target.value });
  };

  const handleLocationInput = (e) => {
    setlaptopInfo({ ...laptopInfo, location: e.target.value });
  };
  const handleusedMnthInput = (e) => {
    setlaptopInfo({ ...laptopInfo, usedMnth: e.target.value });
  };
  
  const handlePhoneNumberInput = (e) => {
    setlaptopInfo({ ...laptopInfo, phoneNumber: e.target.value });
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
    formData.append("productName","Laptop");
    formData.append("quantity",1);
    formData.append("company", laptopInfo.company);
    formData.append("model", laptopInfo.model);
    formData.append("ram", suggestedModelInfo.ram);
    formData.append("rom", suggestedModelInfo.rom);
    formData.append("frontCamera", suggestedModelInfo.frontCamera);
    formData.append("rearCamera", suggestedModelInfo.rearCamera);
    formData.append("battery", suggestedModelInfo.battery);
    formData.append("description", laptopInfo.description);
    formData.append("isWorkingProperly", laptopInfo.isWorkingProperly);
    formData.append("issues", laptopInfo.issues);
    formData.append("price", laptopInfo.price);
    formData.append("termsAgreed", laptopInfo.termsAgreed);
    formData.append("courierOption", laptopInfo.courierOption);
    formData.append("location", laptopInfo.location);
    formData.append("phoneNumber", laptopInfo.phoneNumber);
    formData.append("usedMnth",laptopInfo.usedMnth);
  
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
    laptopInfo.termsAgreed &&
    laptopInfo.courierOption &&
    laptopInfo.location &&
    laptopInfo.phoneNumber;



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
          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">Which company is your laptop from?</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {companyData.map((company, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 rounded border ${laptopInfo.company === company.name ? 'border-green-500' : 'border-gray-200'
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
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Select your laptop model</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {getModelsByCompany(laptopInfo.company).map((model, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 rounded border ${laptopInfo.model === model ? 'border-green-500' : 'border-gray-200'
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
          <h2 className="text-xl font-semibold mb-4 text-blue-700 text-center">Does your laptop work properly?</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            {['Yes', 'No', 'Sometimes', 'Yes, with some issues'].map((condition, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 rounded border ${laptopInfo.isWorkingProperly === condition ? 'border-green-500' : 'border-gray-200'
                  } hover-bg-gray-100`}
                onClick={() => handleConditionSelect(condition)}
              >
                {condition}
              </div>
            ))}
          </div>
        </div>
      )}

      {laptopInfo.isWorkingProperly === 'Yes' && showPriceInput && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Set a price for your laptop</h2>
          <input
            type="number"
            value={laptopInfo.price}
            onChange={handlePriceInput}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
      )}

      {laptopInfo.isWorkingProperly !== 'Yes' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Any issues with your device?</h2>
          <textarea
            value={laptopInfo.issues}
            onChange={getIssuesInput}
            className="border border-gray-300 rounded p-2 w-full h-16"
          />
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Courier Option</h2>
        <input
          type="text"
          value={laptopInfo.courierOption}
          onChange={handleCourierOption}
          className="border border-gray-300 rounded p-2 w-full h-16"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Location</h2>
        <input
          type="text"
          value={laptopInfo.location}
          onChange={handleLocationInput}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Used Month</h2>
        <input
          type="text"
          value={laptopInfo.usedMnth}
          onChange={handleusedMnthInput}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Phone Number</h2>
        <input
          type="text"
          value={laptopInfo.phoneNumber}
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
            checked={laptopInfo.termsAgreed}
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

export default LaptopSell;
