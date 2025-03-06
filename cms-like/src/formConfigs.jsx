const formConfigs = [
    {
        formName: "User Registration",
        apiEndpoint: "/api/users",
        collection: "users",
        fields: [
            { label: "Username", name: "username", type: "text", placeholder: "Enter username", validation: { required: true } },
            { label: "Password", name: "password", type: "password", placeholder: "Enter password", validation: { required: true } },
            { label: "Email", name: "email", type: "email", placeholder: "Enter email", validation: { required: true } },
        ],
    },
    {
        formName: "Add Book",
        apiEndpoint: "/api/books",
        collection: "books",
        fields: [
            { label: "Title", name: "title", type: "text", placeholder: "Enter book title", validation: { required: true } },
            { label: "Author", name: "author", type: "text", placeholder: "Enter author name", validation: { required: true } },
            { label: "ISBN", name: "isbn", type: "text", placeholder: "Enter ISBN", validation: { required: true } },
        ],
    },
    {
        formName: "Login",
        apiEndpoint: "/api/login",
        collection: "auth",
        fields: [
            { label: "Username", name: "username", type: "text", placeholder: "Enter username", validation: { required: true } },
            { label: "Password", name: "password", type: "password", placeholder: "Enter password", validation: { required: true } },
        ],
    },
];

export default formConfigs;