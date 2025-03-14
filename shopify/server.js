const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.get("/products", async (req, res) => {
    try {
        const response = await axios.get(
            `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2025-03/products.json`,
            {
                headers: {
                    "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));