const formConfigs = [
    // 1. Update User Profile
    {
        formName: "Update Profile",
        apiEndpoint: "/api/users/update",
        collection: "users",
        fields: [
            {
                label: "First Name",
                name: "firstName",
                type: "text",
                placeholder: "Enter your first name",
                validation: { required: true, minLength: 2 },
            },
            {
                label: "Last Name",
                name: "lastName",
                type: "text",
                placeholder: "Enter your last name",
                validation: { required: true, minLength: 2 },
            },
            {
                label: "Favourite Color",
                name: "color",
                type: "color",
                placeholder: "Enter your favorite color",
            },
            {
                label: "Profile",
                name: "profile",
                type: "file",
                placeholder: "Upload",
            },
            {
                label: "Phone Number",
                name: "phoneNumber",
                type: "tel",
                placeholder: "Enter your phone number",
                validation: {
                    required: true,
                    pattern: "^[0-9]{10}$",
                },
            },
        ],
    },
    // 2. Add Product
    {
        formName: "Add Product",
        apiEndpoint: "/api/products",
        collection: "products",
        fields: [
            {
                label: "Product Name",
                name: "productName",
                type: "text",
                placeholder: "Enter product name",
                validation: { required: true, minLength: 3 },
            },
            {
                label: "Price",
                name: "price",
                type: "number",
                placeholder: "Enter product price",
                validation: { required: true, min: 0.01 },
            },
            {
                label: "Description",
                name: "description",
                type: "textarea",
                placeholder: "Enter product description",
                validation: { required: true, minLength: 10 },
            },
        ],
    },
    // 3. Create Event
    {
        formName: "Create Event",
        apiEndpoint: "/api/events",
        collection: "events",
        fields: [
            {
                label: "Event Name",
                name: "eventName",
                type: "text",
                placeholder: "Enter event name",
                validation: { required: true, minLength: 3 },
            },
            {
                label: "Date",
                name: "date",
                type: "date",
                validation: { required: true },
            },
            {
                label: "Location",
                name: "location",
                type: "text",
                placeholder: "Enter event location",
                validation: { required: true },
            },
        ],
    },
    // 4. Add Category
    {
        formName: "Add Category",
        apiEndpoint: "/api/categories",
        collection: "categories",
        fields: [
            {
                label: "Category Name",
                name: "categoryName",
                type: "text",
                placeholder: "Enter category name",
                validation: { required: true, minLength: 3 },
            },
            {
                label: "Description",
                name: "description",
                type: "textarea",
                placeholder: "Enter category description",
                validation: { required: false },
            },
        ],
    },
    // 5. Register Student
    {
        formName: "Register Student",
        apiEndpoint: "/api/students",
        collection: "students",
        fields: [
            {
                label: "Student Name",
                name: "studentName",
                type: "text",
                placeholder: "Enter student name",
                validation: { required: true, minLength: 3 },
            },
            {
                label: "Roll Number",
                name: "rollNumber",
                type: "text",
                placeholder: "Enter roll number",
                validation: {
                    required: true,
                    pattern: "^[0-9]{1,10}$",
                },
            },
            {
                label: "Class",
                name: "class",
                type: "text",
                placeholder: "Enter class",
                validation: { required: true },
            },
        ],
    },
    // 6. Add Employee
    {
        formName: "Add Employee",
        apiEndpoint: "/api/employees",
        collection: "employees",
        fields: [
            {
                label: "Full Name",
                name: "fullName",
                type: "text",
                placeholder: "Enter full name",
                validation: { required: true, minLength: 3 },
            },
            {
                label: "Position",
                name: "position",
                type: "text",
                placeholder: "Enter position",
                validation: { required: true },
            },
            {
                label: "Salary",
                name: "salary",
                type: "number",
                placeholder: "Enter salary",
                validation: { required: true, min: 1 },
            },
        ],
    },
    // 7. Feedback Form
    {
        formName: "Feedback Form",
        apiEndpoint: "/api/feedback",
        collection: "feedback",
        fields: [
            {
                label: "Name",
                name: "name",
                type: "text",
                placeholder: "Enter your name",
                validation: { required: true, minLength: 3 },
            },
            {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "Enter your email",
                validation: { required: true },
            },
            {
                label: "Feedback",
                name: "feedback",
                type: "textarea",
                placeholder: "Enter your feedback",
                validation: { required: true, minLength: 10 },
            },
        ],
    },
    // 8. Add Order
    {
        formName: "Add Order",
        apiEndpoint: "/api/orders",
        collection: "orders",
        fields: [
            {
                label: "Order Number",
                name: "orderNumber",
                type: "text",
                placeholder: "Enter order number",
                validation: { required: true, pattern: "^[A-Z0-9]{5,10}$" },
            },
            {
                label: "Customer Name",
                name: "customerName",
                type: "text",
                placeholder: "Enter customer name",
                validation: { required: true },
            },
            {
                label: "Total Amount",
                name: "totalAmount",
                type: "number",
                placeholder: "Enter total amount",
                validation: { required: true, min: 1 },
            },
        ],
    },
    // 9. Add Blog Post
    {
        formName: "Add Blog Post",
        apiEndpoint: "/api/blogs",
        collection: "blogs",
        fields: [
            {
                label: "Title",
                name: "title",
                type: "text",
                placeholder: "Enter blog title",
                validation: { required: true, minLength: 3 },
            },
            {
                label: "Content",
                name: "content",
                type: "textarea",
                placeholder: "Enter blog content",
                validation: { required: true, minLength: 10 },
            },
            {
                label: "Author",
                name: "author",
                type: "text",
                placeholder: "Enter author name",
                validation: { required: true },
            },
        ],
    },
    // 10. Create Ticket
    {
        formName: "Create Ticket",
        apiEndpoint: "/api/tickets",
        collection: "tickets",
        fields: [
            {
                label: "Subject",
                name: "subject",
                type: "text",
                placeholder: "Enter ticket subject",
                validation: { required: true, minLength: 5 },
            },
            {
                label: "Description",
                name: "description",
                type: "textarea",
                placeholder: "Describe the issue",
                validation: { required: true, minLength: 10 },
            },
            {
                label: "Priority",
                name: "priority",
                type: "select",
                options: ["Low", "Medium", "High"],
                validation: { required: true },
            },
        ],
    },
];

export default formConfigs;
