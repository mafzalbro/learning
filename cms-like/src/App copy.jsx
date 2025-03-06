import React from "react";
import DynamicForm from "./component/DynamicForm";
import formConfigs from "./data/formConfig";

const App = () => {

  const handleSubmit = async (apiEndpoint, payload) => {
    console.log(`Sending data to ${apiEndpoint}:`, payload);
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", margin: "0 auto", width: "80%" }}>
      {formConfigs.map((config, index) => (
        <div style={{margin: "20px"}}>
          <DynamicForm
            key={index}
            formName={config.formName}
            apiEndpoint={config.apiEndpoint}
            collection={config.collection}
            fields={config.fields}
            onSubmit={handleSubmit}
            btnText="Submit"
          />
        </div>
      ))}
    </div>
  );
};

export default App;
