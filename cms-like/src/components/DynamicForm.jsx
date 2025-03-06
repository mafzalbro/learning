import React, { useState } from "react";

const DynamicForm = ({ formName, apiEndpoint, collection, fields, onSubmit, btnText }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (e, field) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (field.validation) {
            const error = validateField(value, field.validation);
            setErrors({ ...errors, [name]: error });
        }
    };

    const validateField = (value, validation) => {
        if (validation.required && !value) {
            return "This field is required";
        }
        if (validation.minLength && value.length < validation.minLength) {
            return `Minimum ${validation.minLength} characters required`;
        }
        if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
            return "Invalid format";
        }
        return null;
    };

    const validateForm = () => {
        const newErrors = {};
        fields.forEach((field) => {
            const value = formData[field.name] || "";
            const error = field.validation ? validateField(value, field.validation) : null;
            if (error) newErrors[field.name] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const payload = { collection, data: formData };
            onSubmit(payload);
        }
    };

    console.log(fields, formData);


    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>{formName}</h2>
            {fields?.map((field, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                    <label style={{ fontWeight: "bold" }}>
                        {field.label}
                        {field.validation?.required && <span style={{ color: "red" }}> *</span>}
                    </label>
                    {field.type === "textarea" ? (
                        <textarea
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field)}
                            style={{ display: "block", width: "100%", padding: "0.8rem", margin: "0.5rem 0", borderRadius: "6px", border: "1px solid #ccc", resize: "vertical" }}
                        />
                    ) : field.type === "select" ? (
                        <select
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field)}
                            className="bg-[#242424]"
                            style={{ display: "block", width: "100%", padding: "0.8rem", margin: "0.5rem 0", borderRadius: "6px", border: "1px solid #ccc" }}
                        >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type || "text"}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field)}
                            style={{ display: "block", width: "100%", padding: "0.8rem", margin: "0.5rem 0", borderRadius: "6px", border: "1px solid #ccc" }}
                        />
                    )}
                    {errors[field.name] && (
                        <span style={{ color: "red", fontSize: "0.9rem" }}>
                            {errors[field.name]}
                        </span>
                    )}
                </div>
            ))}
            <button
                type="submit"
                style={{
                    display: "block",
                    width: "100%",
                    padding: "0.8rem",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    cursor: "pointer",
                }}
            >
                {btnText}
            </button>
        </form>
    );
};

export default DynamicForm;