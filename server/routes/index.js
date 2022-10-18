var express = require("express");
var router = express.Router();

//~------------------------* Get User Router *------------------------~//

/**
 * @swagger
 *  tags:
 *      name: Home Page
 *      description: This is the home page of the backend.
 */

/**
 * @swagger
 *  /:
 *      get:
 *          summary: This is display page for the E-commerce backend.
 *          tags: [Home Page]
 *          description: Default page is displaying.
 *          responses: 
 *              200:
 *                  description: Success.
 *              400:
 *                  description: Failed.
 *
 */

router.get("/", (req, res) => {
    res.render("index", { title: "E-commerce" });
    res.status(200).json('Success')
});

module.exports = router;
