import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const companyData = [
    { name: 'Google', logo: '/images/google.jpg', models: ['Pixel Slate', 'Pixel C'] },
    { name: 'Amazon', logo: '/images/amazon.jpg', models: ['Fire HD 10', 'Fire HD 8'] },
    { name: 'Huawei', logo: '/images/huawei.jpg', models: ['MatePad Pro', 'MediaPad T5'] },
    { name: 'Lenovo', logo: '/images/lenovo.jpg', models: ['Tab P11', 'Tab M10'] },
    // Add more companies with logos and tablet models
  ];


function TabletSell() {
  const em=localStorage.getItem("emailData");
  const [images, setImages] = useState([]);
  const [modelToSell,setModelToSell] = useState({});
  const [email, setEmail] = useState(em);
  const [Price,setPrice]= useState(10000)
  const navigate= useNavigate();
  const [tabletInfo, settabletInfo] = useState({
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
        'Pixel Slate': { ram: '8GB', rom: '64GB', rearCamera: '12MP', frontCamera: '8MP', battery: '4850mAh' },
        'Pixel C': { ram: '3GB', rom: '32GB', rearCamera: '8MP', frontCamera: 'N/A', battery: '9243mAh' },
        'Fire HD 10': { ram: '2GB', rom: '32GB', rearCamera: '2MP', frontCamera: '2MP', battery: '3830mAh' },
        'Fire HD 8': { ram: '2GB', rom: '32GB', rearCamera: '2MP', frontCamera: '2MP', battery: '3210mAh' },
        'MatePad Pro': { ram: '6GB', rom: '128GB', rearCamera: '13MP', frontCamera: '8MP', battery: '7250mAh' },
        'MediaPad T5': { ram: '2GB', rom: '16GB', rearCamera: '5MP', frontCamera: '2MP', battery: '5100mAh' },
        'Tab P11': { ram: '4GB', rom: '128GB', rearCamera: '13MP', frontCamera: '8MP', battery: '7700mAh' },
        'Tab M10': { ram: '2GB', rom: '32GB', rearCamera: '5MP', frontCamera: '2MP', battery: '4850mAh' },
        // Add more tablet models with their info
      };
      

    return modelInfoMap[modelName] || {}; // Return the info if available, or an empty object
  }

  const [showCompanyQuestion, setShowCompanyQuestion] = useState(true);
  const [showModelSelection, setShowModelSelection] = useState(false);
  const [showConditionQuestion, setShowConditionQuestion] = useState(false);
  const [showPriceInput, setShowPriceInput] = useState(false);

  const handleCompanySelect = (companyName) => {
    settabletInfo({ ...tabletInfo, company: companyName });
    setShowCompanyQuestion(false);
    setShowModelSelection(true);
  };

  const handleModelSelect = (modelName) => {

    setModelToSell(modelName);
    //console.log(modelToSell);
    settabletInfo({ ...tabletInfo, model: modelName });
    // Suggest the model info based on the selected model
    const suggestedModel = companyData
      .find((company) => company.name === tabletInfo.company)
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
    settabletInfo({ ...tabletInfo, issues: e.target.value });
  };

  const handleConditionSelect = (condition) => {
    settabletInfo({ ...tabletInfo, isWorkingProperly: condition });
    if (condition !== 'Yes') {
      setShowPriceInput(false);
    } else {
      setShowPriceInput(true);
    }
  };

  const handlePriceInput = (e) => {
    settabletInfo({ ...tabletInfo, price: e.target.value });
  };

  const handleTermsAgreed = () => {
    settabletInfo({ ...tabletInfo, termsAgreed: !tabletInfo.termsAgreed });
  };

  const handleCourierOption = (e) => {
    settabletInfo({ ...tabletInfo, courierOption: e.target.value });
  };

  const handleLocationInput = (e) => {
    settabletInfo({ ...tabletInfo, location: e.target.value });
  };
  const handleusedMnthInput = (e) => {
    settabletInfo({ ...tabletInfo, usedMnth: e.target.value });
  };
  
  const handlePhoneNumberInput = (e) => {
    settabletInfo({ ...tabletInfo, phoneNumber: e.target.value });
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
    formData.append("productName","tablet");
    formData.append("quantity",1);
    formData.append("company", tabletInfo.company);
    formData.append("model", tabletInfo.model);
    formData.append("ram", suggestedModelInfo.ram);
    formData.append("rom", suggestedModelInfo.rom);
    formData.append("frontCamera", suggestedModelInfo.frontCamera);
    formData.append("rearCamera", suggestedModelInfo.rearCamera);
    formData.append("battery", suggestedModelInfo.battery);
    formData.append("description", tabletInfo.description);
    formData.append("isWorkingProperly", tabletInfo.isWorkingProperly);
    formData.append("issues", tabletInfo.issues);
    formData.append("price", tabletInfo.price);
    formData.append("termsAgreed", tabletInfo.termsAgreed);
    formData.append("courierOption", tabletInfo.courierOption);
    formData.append("location", tabletInfo.location);
    formData.append("phoneNumber", tabletInfo.phoneNumber);
    formData.append("usedMnth",tabletInfo.usedMnth);
  
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
    tabletInfo.termsAgreed &&
    tabletInfo.courierOption &&
    tabletInfo.location &&
    tabletInfo.phoneNumber;



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
                className={`cursor-pointer p-4 rounded border ${tabletInfo.company === company.name ? 'border-green-500' : 'border-gray-200'
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
            {getModelsByCompany(tabletInfo.company).map((model, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 rounded border ${tabletInfo.model === model ? 'border-green-500' : 'border-gray-200'
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
                className={`cursor-pointer p-4 rounded border ${tabletInfo.isWorkingProperly === condition ? 'border-green-500' : 'border-gray-200'
                  } hover-bg-gray-100`}
                onClick={() => handleConditionSelect(condition)}
              >
                {condition}
              </div>
            ))}
          </div>
        </div>
      )}

      {tabletInfo.isWorkingProperly === 'Yes' && showPriceInput && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Set a price for your tablet</h2>
          <input
            type="number"
            value={tabletInfo.price}
            onChange={handlePriceInput}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
      )}

      {tabletInfo.isWorkingProperly !== 'Yes' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Any issues with your device?</h2>
          <textarea
            value={tabletInfo.issues}
            onChange={getIssuesInput}
            className="border border-gray-300 rounded p-2 w-full h-16"
          />
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Courier Option</h2>
        <input
          type="text"
          value={tabletInfo.courierOption}
          onChange={handleCourierOption}
          className="border border-gray-300 rounded p-2 w-full h-16"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Location</h2>
        <input
          type="text"
          value={tabletInfo.location}
          onChange={handleLocationInput}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Used Month</h2>
        <input
          type="text"
          value={tabletInfo.usedMnth}
          onChange={handleusedMnthInput}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Phone Number</h2>
        <input
          type="text"
          value={tabletInfo.phoneNumber}
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
            checked={tabletInfo.termsAgreed}
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

export default TabletSell;
