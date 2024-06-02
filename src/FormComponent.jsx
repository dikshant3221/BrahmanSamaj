import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";
import "./styles.css"; // Import custom CSS


const FormComponent = () => {
  const formRef = useRef(null);
  const [formDetails, setFormDetails] = useState({
    Name: "",
    TimeOfBirth: "",
    DateOfBirth: "",
    PlaceOfBirth: "",
    Height: "",
    Education: "",
    weight: "",
    colorShade: "",
    caste: "",
    gotra: "",
    Vegetarian: "",
    parentAlive: "",
    mariedStatus: "",
    otherCasteMarriage: "",
    lookingInNcr: "",
    manglikDosh: "",
    profession: "",
    MonthlyIncome: "",
    requirementInBrideOrGroom: "",
    CurrentAddress: "",
    ContactNumber: "",
    WidowDetails: "",
    disablity: "",
    glassesDetails: "",
    specificDetails: "",

    fatherName: "",
    motherName: "",
    relationWithGroom: "",
    fatherBuisness: "",
    overallIncome: "",

    homeArea: "",

    ownerOrTenant: "",
    totalChilds: "",
    totalBoys: "",
    boysMarried: "",
  });

  const [file, setFile] = useState(null);

  const updateBrideGroomDetails = ({ target: { id, value } }) => {
    setFormDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
  };

  const handleFileChange = ({ target: { files } }) => {
    setFile(files[0]);
  };

  const generatePDF = (details, file) => {
    const doc = new jsPDF();
    let verticalOffset = 10;

    Object.entries(details).forEach(([key, value]) => {
      if (value.trim()) {
        doc.text(`${key}: ${value}`, 10, verticalOffset);
        verticalOffset += 10;
      }
    });

    if (file) {
      doc.text(`File Name: ${file.name}`, 10, verticalOffset);
      verticalOffset += 10;
      doc.text(`File Type: ${file.type}`, 10, verticalOffset);
    }

    return doc.output("blob");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pdfBlob = generatePDF(formDetails, file);

    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = () => {
      emailjs
        .send(
          "service_lsb7uk8",
          "template_99fy00m",
          {
            to_name: formDetails.userName,
            from_name: "Your Name or App Name",
            to_email: "recipient@example.com",
            subject: "Form Details",
            attachment: reader.result,
            message: "Here are your form details in the attached PDF.",
          },
          "xQcuDwjFgDu2DGmBl"
        )
        .then((response) => {
          console.log("Email sent successfully:", response);
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
        });
    };
  };

  return (
    <div className="container">
      <header className="my-4">
        <div class="card-header p-2 custom-gradient-14 text-white">
          <div class="display-6 ps-2">FREE REGISTRATION</div>
          <p class="card-text text-muted">
            <small class="text-white">
              &nbsp;&nbsp;Best Matrimonial website only for Brahman Samaj, since
              2012. You will surely get a great response here
            </small>
          </p>
        </div>
      </header>
      
    
      <form id="myForm" ref={formRef} onSubmit={handleSubmit}>
        {Object.keys(formDetails).map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>
              {field.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              id={field}
              onChange={updateBrideGroomDetails}
              value={formDetails[field]}
              className="form-control"
              type="text"
              placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
            />
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="file">Upload File</label>
          <input
            id="file"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="form-control-file"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <footer className="my-4">
        <p>&copy; 2024 Bride/Groom Form. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FormComponent;
