const cartModel = require("../models/cart.model");
const asyncHandler = require("../utils/asyncHandler");
const _ = require("lodash");
const ApiError = require("../utils/error");
const productModel = require("../models/product.model");

const addToCart = asyncHandler(async (req, res, next) => {
	try {
		const { product, quantity } = req.body;

		const checkProduct = await productModel.findById(product).select("_id");
		if (_.isEmpty(checkProduct)) {
			throw new ApiError("Product not found", 404);
		}

		const cart = await cartModel.findOne({ user: req.user });
		if (_.isEmpty(cart)) {
			const newCart = new cartModel({
				user: req.user,
				items: [{ product, quantity }],
			});
			await newCart.save();

			return res.status(201).json({
				success: true,
				message: "Product added to cart successfully",
				data: newCart,
			});
		}

		const existingProduct = cart.items.find(
			(item) => item.product.toString() === product
		);
		if (existingProduct) {
			existingProduct.quantity += quantity;
		} else {
			cart.items.push({ product, quantity });
		}
		await cart.save();
		return res.status(200).json({
			success: true,
			message: "Product added to cart successfully",
			data: cart,
		});

	} catch (err) {
		next(err);
	}
});


const getCart = asyncHandler(async (req, res, next) => {
	try {
		const cart = await cartModel.findOne({ user: req.user });
		if (_.isEmpty(cart)) {
			throw new ApiError("Cart not found", 404);
		}
		const populateCart = await cart.populate("items", "name image price brand tags category");
		return res.status(200).json({
			success: true,
			message: "Cart fetched successfully",
			data: populateCart,
		});
	} catch (err) {
		next(err);
	}
});

const updateCart = asyncHandler(async (req, res, next) => {
	try {
		const { product, quantity } = req.body;
		const checkProduct = await productModel.findById(product).select("_id");
		if (_.isEmpty(checkProduct)) {
			throw new ApiError("Product not found", 404);
		}
		const cart = await cartModel.findOne({ user: req.user });
		if (_.isEmpty(cart)) {
			throw new ApiError("Cart not found", 404);
		}
		const existingProduct = cart.items.find(
			(item) => item.product.toString() === product
		);
		if (_.isEmpty(existingProduct)) {
			throw new ApiError("Product not found in cart", 404);
		}
		existingProduct.quantity = quantity;

		await cart.save();
		return res.status(200).json({
			success: true,
			message: "Cart updated successfully",
			data: cart,
		});
	} catch (err) {
		next(err);
	}
});

const removeFromCart = asyncHandler(async (req, res, next) => {
	try {
		const { product } = req.body;
		const checkProduct = await productModel.findById(product).select("_id");
		if (_.isEmpty(checkProduct)) {
			throw new ApiError("Product not found", 404);
		}
		const cart = await cartModel.findOne({ user: req.user });
		if (_.isEmpty(cart)) {
			throw new ApiError("Cart not found", 404);
		}
		const existingProduct = cart.items.find(
			(item) => item.product.toString() === product
		);
		if (_.isEmpty(existingProduct)) {
			throw new ApiError("Product not found in cart", 404);
		}
		cart.products = cart.products.filter(
			(item) => item.product.toString() !== product
		);
		await cart.save();
		return res.status(200).json({
			success: true,
			message: "Product removed from cart successfully",
			data: cart,
		});
	} catch (err) {
		next(err);
	}
})

const clearCart = asyncHandler(async (req, res, next) => {
	try {
		const cart = await cartModel.findOne({ user: req.user });
		if (_.isEmpty(cart)) {
			throw new ApiError("Cart not found", 404);
		}
		cart.items = [];
		await cart.save();
		return res.status(200).json({
			success: true,
			message: "Cart cleared successfully",
			data: cart,
		});
	} catch (err) {
		next(err);
	}
})

module.exports = { addToCart, getCart, updateCart, removeFromCart, clearCart };