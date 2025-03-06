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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const payload = { collection, data: formData };
            onSubmit(apiEndpoint, payload); // Send data with endpoint and collection info
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{formName}</h2>
            {fields.map((field, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                    <label>
                        {field.label}
                        {field.validation?.required && <span style={{ color: "red" }}> *</span>}
                    </label>
                    <input
                        type={field.type || "text"}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(e, field)}
                        style={{ display: "block", width: "100%", padding: "0.8rem", margin: "0.5rem 0", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                    {errors[field.name] && (
                        <span style={{ color: "red", fontSize: "0.9rem" }}>
                            {errors[field.name]}
                        </span>
                    )}
                </div>
            ))}
            <button type="submit">{btnText}</button>
        </form>
    );
};

export default DynamicForm;