import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
   const products = await Product.find({});
   res.status(200).json({ products });
});

// @desc    Fetch My products
// @route   GET /api/products/myproducts
// @access  Private
const getMyProducts = asyncHandler(async (req, res) => {
   // const pageSize = process.env.PAGINATION_LIMIT;
   // const page = Number(req.query.pageNumber) || 1;

   const products = await Product.find({ user: req.user._id });
   res.status(200).json({ products });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
   // NOTE: checking for valid ObjectId to prevent CastError moved to separate
   // middleware. See README for more info.

   const product = await Product.findById(req.params.id);
   if (product) {
      return res.json(product);
   } else {
      // NOTE: this will run if a valid ObjectId but no product was found
      // i.e. product may be null
      res.status(404);
      throw new Error("Product not found");
   }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
   // res.send("admin");
   const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
   });
   const createdProduct = await product.save();
   console.log(product);
   res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
   const { name, price, description, image, brand, category, countInStock } =
      req.body;

   const product = await Product.findById(req.params.id);

   if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
   } else {
      res.status(404);
      throw new Error("Product not found");
   }
});

// @desc    Update a product Qty
// @route   PUT /api/products/:id
// @access  Public
const updateProductQty = asyncHandler(async (req, res) => {
   // console.log("hello");
   // res.send("test");
   const { qty } = req.body;

   const product = await Product.findById(req.params.id);

   if (product) {
      product.countInStock = product.countInStock - qty;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
   } else {
      res.status(404);
      throw new Error("Product not found");
   }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id);
   // const product = await Product.findByIdAndDelete(req.params.id);
   //  const product = await Product.deleteMany(req.params.id);
   // res.json({ message: "Product removed" });
   if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: "Product removed" });
   } else {
      res.status(404);
      throw new Error("Product not found");
   }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
   const { rating, comment } = req.body;

   const product = await Product.findById(req.params.id);

   if (product) {
      const alreadyReviewed = product.reviews.find(
         (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
         res.status(400);
         throw new Error("Product already reviewed");
      }

      const review = {
         name: req.user.name,
         rating: Number(rating),
         comment,
         user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
         product.reviews.reduce((acc, item) => item.rating + acc, 0) /
         product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
   } else {
      res.status(404);
      throw new Error("Product not found");
   }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
   const products = await Product.find({}).sort({ rating: -1 }).limit(4);
   res.json(products);
});

export {
   getProducts,
   getMyProducts,
   getProductById,
   createProduct,
   updateProduct,
   updateProductQty,
   deleteProduct,
   createProductReview,
   getTopProducts,
};
