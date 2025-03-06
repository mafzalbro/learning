import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DynamicForm from "./components/DynamicForm";
import formConfigs from "./formConfigs";

const AppRoutes = () => {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/users" style={{ marginRight: "10px" }}>User Registration</Link>
        <Link to="/books" style={{ marginRight: "10px" }}>Add Book</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        {formConfigs.map((formConfig, index) => (
          <Route
            key={index}
            path={formConfig.apiEndpoint.replace("/api", "")}
            element={
              <DynamicForm
                formName={formConfig.formName}
                fields={formConfig.fields}
                onSubmit={(data) => handleSubmit(data, formConfig.apiEndpoint, formConfig.collection)}
                btnText="Submit"
              />
            }
          />
        ))}

        {/* Example of a generic home route */}
        <Route path="/" element={<div>Welcome to Dynamic Forms App</div>} />
      </Routes>
    </Router>
  );
};

// Dummy submission handler
const handleSubmit = (data, apiEndpoint, collection) => {
  console.log("Form Data:", data);
  console.log("API Endpoint:", apiEndpoint);
  console.log("Collection:", collection);

  // Example: Send data to API
  fetch(apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => console.log("Submission Successful:", result))
    .catch((error) => console.error("Submission Failed:", error));
};

export default AppRoutes;
