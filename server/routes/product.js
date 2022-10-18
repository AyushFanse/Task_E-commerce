var express = require("express");
var router = express.Router();
var Product = require("../modules/productModule");


//~------------* Default Swagger Component *------------~//

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                  productId:
 *                      type: string 
 *                  name:
 *                      type: string 
 *                  productType:
 *                      type: string 
 *                  category:
 *                      type: string 
 *                  basePrice:
 *                      type: integer 
 *                  charges:
 *                      type: array
 */


//~------------* Swagger Tags *------------~//

/**
 * @swagger
 *  tags:
 *      name: Product
 *      description: Product data managing API.
 */


//~--------------------* CREATE PRODUCT DATA *--------------------~//

/**
 * @swagger
 *  /product/add:
 *      post:
 *          summary: Post method to upload new product data.
 *          tags: [Product]
 *          description: Upload new product details with required data.
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Product'
 *          responses: 
 *              200:
 *                  description: Success.
 *              400:
 *                  description: Failed.
 */

router.post("/add", Product.ProductRegister);

//~------------------------* GET PRODUCT DATA *------------------------~//
/**
 * @swagger
 *  /product/get/all:
 *      get:
 *          summary: Get method to get all the product data.
 *          tags: [Product]
 *          description: Gives all product data.
 *          responses: 
 *              200:
 *                  description: Success.
 *              400:
 *                  description: Failed.
 *
 */

router.get("/get/all", Product.getProduct);

//~------------------------* GET PRODUCT DATA BY ID *------------------------~//
/**
 * @swagger
 *  /product/get/{productId}:
 *      get:
 *          summary: Get product by it's productId.
 *          tags: [Product]
 *          description: Single product data for particular productId.
 *          parameters:
 *            - in: path
 *              name: productId
 *              required: true
 *              description: productId is required.
 *              schema: 
 *                  type: string
 *          responses: 
 *              200:
 *                  description: Success.
 *              400:
 *                  description: Failed.
 *
 */

router.get("/get/:productId", Product.getProductById);

//~------------------------* UPDATE PRODUCT DATA *------------------------~//

/**
 * @swagger
 *  /product/update/{productId}:
 *      patch:
 *          summary: Update method to patch the product data by it's productId.
 *          tags: [Product]
 *          description: Which update the product data.
 *          parameters:
 *            - in: path
 *              name: productId
 *              required: true
 *              description: productId is required.
 *              schema: 
 *                  type: string
 *          requestBody:
 *              required: false
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Product'
 *          responses: 
 *              200:
 *                  description: Success.
 *              400:
 *                  description: Failed.
 *
 */


router.patch("/update/:productId", Product.updateProduct);

//~------------------------* DELETE PRODUCT DATA BY ID *------------------------~//

/**
 * @swagger
 *  /product/delete/{productId}:
 *      delete:
 *          summary: Delete method to delete the product data by it's productId.
 *          tags: [Product]
 *          description: Delete the  product data.
 *          parameters:
 *            - in: path
 *              name: productId
 *              required: true
 *              description: productId is required.
 *              schema: 
 *                  type: string
 *          responses: 
 *              200:
 *                  description: Success.
 *              400:
 *                  description: Failed.
 *
 */

router.delete("/delete/:productId", Product.deleteProduct);

module.exports = router;
