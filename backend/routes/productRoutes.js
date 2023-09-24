import express from "express";
const router = express.Router();
import {
   getProducts,
   getProductById,
   createProduct,
   updateProduct,
   deleteProduct,
   createProductReview,
   getTopProducts,
   updateProductQty,
   getMyProducts,
} from "../controllers/productController.js";
import {
   protect,
   admin,
   adminOrSupplier,
   supplier,
} from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router
   .route("/")
   .get(getProducts)
   .post(protect, adminOrSupplier, createProduct);

router.route("/myproducts").get(protect, adminOrSupplier, getMyProducts);
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);
router.get("/top", getTopProducts);
router
   .route("/:id")
   .get(checkObjectId, getProductById)
   .put(protect, checkObjectId, updateProduct)
   .delete(protect, checkObjectId, deleteProduct);
router.route("/:id/qty").put(checkObjectId, updateProductQty);

export default router;
