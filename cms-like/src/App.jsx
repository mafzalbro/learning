import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DynamicForm from "./components/DynamicForm";
import CreateFormConfig from "./components/AddFormConfig";
import Navbar from "./components/Navbar";

const AppRoutes = () => {
  const [formConfigs, setFormConfigs] = useState([]);

  // Fetch form configurations from the backend
  useEffect(() => {
    fetch("http://localhost:5000/form-configs")
      .then((response) => response.json())
      .then((data) => setFormConfigs(data))
      .catch((error) => console.error("Error fetching form configs:", error));
  }, []);

  const handleSubmit = (data, apiEndpoint, collection) => {
    data = data.data;
    console.log("Form Data:", data);
    console.log("API Endpoint:", apiEndpoint);
    console.log("Collection:", collection);

    // Find the relevant form configuration for the given collection
    const formConfig = formConfigs.find((config) => config.collection === collection);

    if (!formConfig) {
      console.error(`No form configuration found for collection: ${collection}`);
      return;
    }

    // Filter the submitted data to include only fields relevant to the collection
    const filteredData = {};
    formConfig.fields.forEach((field) => {
      if (data[field.name] !== undefined) {
        filteredData[field.name] = data[field.name];
      }
    });

    console.log("Filtered Data:", filteredData);

    // Send the filtered data to the appropriate API endpoint
    fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredData),
    })
      .then((response) => response.json())
      .then((result) => console.log("Submission Successful:", result))
      .catch((error) => console.error("Submission Failed:", error));
  };


  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Navbar formConfigs={formConfigs} />
        <Routes>
          <Route
            path={"/form-config"}
            element={
              <CreateFormConfig />
            }
          />
          {formConfigs.map((config, index) => (
            <Route
              key={index}
              path={config.apiEndpoint.replace("http://localhost:5000/api", "")}
              element={
                <div style={{ width: "100%", marginLeft: "20px" }}>
                  <DynamicForm
                    formName={config.formName}
                    fields={config.fields}
                    onSubmit={(data) =>
                      handleSubmit(data, config.apiEndpoint, config.collection)
                    }
                    btnText="Submit"
                  />
                </div>
              }
            />
          ))}

          {/* Home route */}
          <Route path="/" element={<div>Welcome to Dynamic Forms App</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;