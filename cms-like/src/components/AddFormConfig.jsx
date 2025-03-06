import React, { useState } from "react";

const CreateFormConfig = () => {
    const [fields, setFields] = useState([
        {
            label: "",
            name: "",
            type: "text",
            placeholder: "",
            options: [],
            validation: { required: false },
        },
    ]);
    const [formConfig, setFormConfig] = useState({
        formName: "",
        apiEndpoint: "",
        collection: "",
    });

    const handleFormConfigChange = (e) => {
        setFormConfig({ ...formConfig, [e.target.name]: e.target.value });
    };

    const handleFieldChange = (index, key, value) => {
        const newFields = [...fields];
        newFields[index][key] = value;
        setFields(newFields);
    };

    const handleOptionChange = (fieldIndex, optionIndex, value) => {
        const newFields = [...fields];
        newFields[fieldIndex].options[optionIndex] = value;
        setFields(newFields);
    };

    const addField = () => {
        setFields([
            ...fields,
            {
                label: "",
                name: "",
                type: "text",
                placeholder: "",
                options: [],
                validation: { required: false },
            },
        ]);
    };

    const removeField = (index) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const addOption = (fieldIndex) => {
        const newFields = [...fields];
        if (!newFields[fieldIndex].options) newFields[fieldIndex].options = [];
        newFields[fieldIndex].options.push("");
        setFields(newFields);
    };

    const removeOption = (fieldIndex, optionIndex) => {
        const newFields = [...fields];
        newFields[fieldIndex].options.splice(optionIndex, 1);
        setFields(newFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formConfig, fields };
        console.log("Payload:", payload);
        // Make API call to /create-form-config
        fetch("http://localhost:5000/create-form-config", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => console.log("Response:", data))
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Create Form Configuration</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(formConfig).map((key) => (
                    <div key={key} className="flex flex-col space-y-2">
                        <label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                        <input
                            type="text"
                            name={key}
                            value={formConfig[key]}
                            onChange={handleFormConfigChange}
                            className="border rounded p-2"
                            placeholder={`Enter ${key}`}
                        />
                    </div>
                ))}
                <h2 className="text-xl font-semibold mt-4">Fields</h2>
                {fields.map((field, index) => (
                    <div key={index} className="border p-4 rounded space-y-2 mb-4">
                        {Object.keys(field).map((key) => {
                            if (key === "options" && field.type === "select") {
                                return (
                                    <div key={key} className="space-y-2">
                                        <label>Options</label>
                                        {field.options.map((option, optionIndex) => (
                                            <div key={optionIndex} className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) =>
                                                        handleOptionChange(index, optionIndex, e.target.value)
                                                    }
                                                    className="border rounded p-2 flex-grow"
                                                    placeholder="Enter option"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeOption(index, optionIndex)}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => addOption(index)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Add Option
                                        </button>
                                    </div>
                                );
                            }
                            if (key === "validation") {
                                return (
                                    <div key={key} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={field[key].required}
                                            onChange={(e) =>
                                                handleFieldChange(index, "validation", {
                                                    ...field[key],
                                                    required: e.target.checked,
                                                })
                                            }
                                        />
                                        <label>Required</label>
                                    </div>
                                );
                            }
                            if (key !== "options") {
                                return (
                                    <div key={key} className="flex flex-col space-y-2">
                                        <label className="capitalize">{key}</label>
                                        {key === "type" ? (
                                            <select
                                                value={field[key]}
                                                onChange={(e) => handleFieldChange(index, key, e.target.value)}
                                                className="border rounded p-2 bg-[#242424]"
                                            >
                                                <option value="text">Text</option>
                                                <option value="number">Number</option>
                                                <option value="email">Email</option>
                                                <option value="password">Password</option>
                                                <option value="textarea">Textarea</option>
                                                <option value="select">Select</option>
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                value={field[key]}
                                                onChange={(e) => handleFieldChange(index, key, e.target.value)}
                                                className="border rounded p-2"
                                                placeholder={`Enter ${key}`}
                                            />
                                        )}
                                    </div>
                                );
                            }
                        })}
                        <button
                            type="button"
                            onClick={() => removeField(index)}
                            className="text-red-500 hover:underline"
                        >
                            Remove Field
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addField}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add More Fields
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateFormConfig;