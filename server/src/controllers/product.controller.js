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
		const sortField = req.query.sortField || "createdAt";
		const sortDirection = parseInt(req.query.sortDirection) || -1;
		
		// Filters
		const query = {};
		if (!_.isEmpty(category) && category !== "All") {
			query.category = category;
		}
		if (!_.isEmpty(search)) {
			const searchEmbedding = await generateEmbedding(search);
			query.embedding = {
				$near: {
					$geometry: {
						type: "Point",
						coordinates: searchEmbedding,
					},
					$maxDistance: 0.5,
				},
			};
		}
		// TODO: ADD more filters
		const products = await productModel
			.find(query)
			.select("-embedding")
			.skip(skip)
			.limit(limit)
			.sort({ [sortField]: sortDirection });


		const totalProductsCount = await productModel.countDocuments(query);
		const totalPages = Math.ceil(totalProductsCount / limit);
		const hasMore = page < totalPages;

		return res.status(200).json({
			success: true,
			products,
			totalCount: totalProductsCount,
			page,
			limit,
			hasMore,
			totalPages,
			message: "Products fetched successfully"
		});
	} catch (error) {
		next(error);
	}
});



const getProductById = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await productModel.findById(id).select("-embedding");
		if (!product) {
			throw new ApiError("Product not found", 404);
		}
		return res.status(200).json({
			success: true,
			product,
			message: "Product fetched successfully"
		});
	} catch (error) {
		next(error);
	}
});

module.exports = { createProduct, createBulkProducts, getAllProducts, getProductById };