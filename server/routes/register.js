const express = require("express");
const router = express.Router();
const Register = require("../modules/registerModule");

//~------------------------* Create Contacts Router *------------------------~//
/**
 * @swagger
 *  /register/:
 *      post:
 *          summary: Post method to create new account.
 *          tags: [User]
 *          description: Create a new account with required credential.
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              email:
 *                                  type: string 
 *                              password:
 *                                  type: string 
 *          responses: 
 *              200:
 *                  description: Success.
 *              400:
 *                  description: Failed.
 */

router.post("/", Register.user_register);

module.exports = router;
