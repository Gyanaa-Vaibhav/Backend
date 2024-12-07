import express, { Router } from "express";
import { data } from "./data.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the product
 *         title:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         image:
 *           type: string
 *           description: The URL of the product image
 *         rating:
 *           type: object
 *           properties:
 *             rate:
 *               type: number
 *               description: The rating score
 *             count:
 *               type: integer
 *               description: The number of ratings
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: The product category
 *     responses:
 *       200:
 *         description: A list of products in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found in this category
 */

export const products = Router();

// Parse JSON payloads
products.use(express.json());

// GET all products
products.get('/', (req, res) => {
    console.log('Fetching all products');
    res.json({ data });
});

// GET a single product by ID
products.get('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert ID to integer
    console.log(`Fetching product with ID: ${id}`);

    const product = data.find(item => item.id === id);

    if (product) {
        res.json({ product });
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

// GET products by category
products.get('/category/:category', (req, res) => {
    const category = req.params.category.toLowerCase(); // Get category and normalize case
    console.log(`Fetching products in category: ${category}`);

    // Filter products by category
    const filteredProducts = data.filter(item => item.category.toLowerCase() === category);

    if (filteredProducts.length > 0) {
        res.json({ products: filteredProducts });
    } else {
        res.status(404).json({ error: "No products found in this category" });
    }
});

// POST a new product
products.post('/', (req, res) => {
    const newProduct = req.body; // Expecting a product object in the request body
    console.log('Adding new product:', newProduct);

    // Validate input
    if (!newProduct.id || !newProduct.title || !newProduct.category) {
        return res.status(400).json({ error: "Invalid product data. 'id', 'title', and 'category' are required." });
    }

    // Check for duplicate ID
    const exists = data.find(item => item.id === newProduct.id);
    if (exists) {
        return res.status(400).json({ error: "Product with this ID already exists." });
    }

    // Add the new product
    data.push(newProduct);
    res.status(201).json({ message: "Product added successfully", product: newProduct });
});

// DELETE a product by ID
products.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert ID to integer
    console.log(`Deleting product with ID: ${id}`);

    const productIndex = data.findIndex(item => item.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found" });
    }

    // Remove the product
    const deletedProduct = data.splice(productIndex, 1);
    res.json({ message: "Product deleted successfully", product: deletedProduct });
});

