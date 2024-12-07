// import express from 'express';
// import * as url from "node:url";
// import * as path from "node:path";
// import {products} from "./Routes/product.js";
// const app = express();
// const PORT = 5173
//
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// app.use('/products',products)
//
// app.listen(PORT,()=>{
//     console.log(`Listening to ${PORT}`)
// })
//
import express from "express";
import * as url from "node:url";
import * as path from "node:path";
import { products } from "./Routes/product.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = 5173;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Products API",
            version: "1.0.0",
            description: "API for managing products",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["./Routes/product.js"], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use("/products", products);

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
