var express = require("express");
var router = express.Router();
var User = require("../modules/userModule");

//~------------* Default Swagger Component *------------~//
/**
 * @swagger
 *  components:
 *      schemas:
 *          Users:
 *              type: object
 *              properties: 
 *                  email:
 *                      type: string 
 *                  password:
 *                      type: string 
 *                  cart:
 *                      type: array
 */

//~------------* Swagger Tags *------------~//

/**
 * @swagger
 *  tags:
 *      name: User
 *      description: User data managing API.
 */

//~------------------------* Get User Router *------------------------~//
/**
 * @swagger
 *  /user/get/all:
 *      get:
 *          summary: Get method to get all the user data.
 *          tags: [User]
 *          description: Gives all user data.
 *          responses: 
 *              200:
 *                  description: Success.
 *              400:
 *                  description: Failed.
 *
 */

router.get("/get/all", User.getUser);

//~------------------------* Get User Router *------------------------~//
/**
 * @swagger
 *  /user/get/{userId}:
 *      get:
 *          summary: Get user by userId.
 *          tags: [User]
 *          description: Single user data for particular userId.
 *          parameters:
 *            - in: path
 *              name: userId
 *              required: true
 *              description: userId is required.
 *              schema: 
 *                  type: string
 *          responses: 
 *              200:
 *                  description: Success.
 *              400:
 *                  description: Failed.
 *
 */

router.get("/get/:userId", User.getUserById);

//~--------------------------* Delete User Router *--------------------------~//

/**
 * @swagger
 *  /user/delete/{userId}:
 *      delete:
 *          summary: Delete method to delete the user data by it's userId.
 *          tags: [User]
 *          description: Delete the  user data.
 *          parameters:
 *            - in: path
 *              name: userId
 *              required: true
 *              description: userId is required.
 *              schema: 
 *                  type: string
 *          responses: 
 *              200:
 *                  description: Success.
 *              400:
 *                  description: Failed.
 *
 */

router.delete("/delete/:userId", User.deleteUser);

//~------------------------* Cart Operations Router *------------------------~//

/**
 * @swagger
 *  /user/cart/{userId}/{productId}:
 *      patch:
 *          summary: Update method to patch the user data by it's userId.
 *          tags: [User]
 *          description: Which update the user data.
 *          parameters:
 *            - in: path
 *              name: userId
 *              required: true
 *              description: userId is required.
 *              schema: 
 *                  type: string
 *            - in: path
 *              name: productId
 *              required: true
 *              description: productId is required.
 *              schemas: 
 *                  type: string
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              productId:
 *                                  type: string 
 *                              quantity:
 *                                  type: integer
 *          responses: 
 *              200:
 *                  description: Success.
 *              400:
 *                  description: Failed.
 *
 */

router.patch("/cart/:userId/:_Id", User.cartOperation);

module.exports = router;
