const { sportsProducts } = require("../constants/sample");
const productModel = require("../models/product.model");
const { generateEmbedding } = require("../services/embedding.service");
const asyncHandler = require("../utils/asyncHandler");
const _ = require("lodash");

const createProduct = asyncHandler(async (req, res) => {
	try {
		const { name, description, category, tags } = req.body;

		const textForEmbedding = `
            ${name}. ${description}. Category: ${category}. Tags: ${tags.join(", ")}
        `;

		const embedding = await generateEmbedding(textForEmbedding);

		const product = await productModel.create({
			...req.body,
			embedding,
		});

		res.status(201).json(product);
	} catch (error) {
		next(error);
	}
})




const createBulkProducts = asyncHandler(async (req, res, next) => {
	try {
		const products = sportsProducts;

		const productsWithEmbeddings = await Promise.all(
			products.map(async (product) => {
				const textForEmbedding = `
          ${product.name}. 
          ${product.description}. 
          Category: ${product.category}. 
          Tags: ${product.tags.join(", ")}
        `;

				const embedding = await generateEmbedding(textForEmbedding);

				return {
					...product,
					embedding,
				};
			})
		);

		const createdProducts = await productModel.insertMany(productsWithEmbeddings);

		if (_.isEmpty(createdProducts)) {
			throw new ApiError("Failed to create products", 400);
		}

		res.status(201).json(createdProducts);
	} catch (error) {
		next(error);
	}
});

module.exports = { createProduct, createBulkProducts };