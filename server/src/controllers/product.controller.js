const { sportsProducts } = require("../constants/sample");
const productModel = require("../models/product.model");
const { generateEmbedding } = require("../services/embedding.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/error");
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


const getAllProducts = asyncHandler(async (req, res, next) => {
	try {

		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;
		const category = req.query.category || "";
		const search = req.query.search || "";
		const sortField = req.query.sort || "createdAt";
		const sortDirection = req.query.direction || -1;


		// Filters
		const query = {};
		if (!_.isEmpty(category) && category !== "All") {
			query.category = category;
		}
		if (!_.isEmpty(search)) {
			query.name = { $regex: search, $options: "i" };
		}
		// TODO: ADD more filters
		const products = await productModel
			.find(query)
			.skip(skip)
			.limit(limit)
			.sort({ [sortField]: sortDirection });


		res.status(200).json({
			success: true,
			products,
			message: "Products fetched successfully"
		});
	} catch (error) {
		next(error);
	}
});


module.exports = { createProduct, createBulkProducts, getAllProducts };