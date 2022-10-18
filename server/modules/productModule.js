const Product = require("../model/Product");
const Joi = require("joi");

//*-------------------* Standard Discounts and GST and Delivery Charges *-------------------*//

const StanderValues = (type) => {
    switch (type.toLowerCase()) {
        case "electronics":
            return {
                discount: 15,
                gst: 18,
                delivery: 350,
            };
        case "home appliances":
            return {
                discount: 22,
                gst: 24,
                delivery: 800,
            };
        case "clothing":
            return {
                discount: 40,
                gst: 12,
                delivery: 0,
            };
        case "furniture":
            return {
                discount: 10,
                gst: 18,
                delivery: 300,
            };
        default:
            return {
                discount: 0,
                gst: 0,
                delivery: 0,
            };
    }
};

//*-------------------* Adding Product Details *-------------------*//

exports.ProductRegister = async (req, res, next) => {
    const schema = Joi.object({
        productId: Joi.string().min(3).max(50).trim(true).required(),
        name: Joi.string().min(3).max(50).trim(true).required(),
        productType: Joi.string().min(3).max(50).trim(true).required(),
        category: Joi.string().min(3).max(50).trim(true).required(),
        basePrice: Joi.number().required(),
        discount: Joi.number(),
        charges: Joi.object({
            gst: Joi.number(),
            delivery: Joi.number(),
        }),
        finalPrice: Joi.number(),
    });

    var { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    const existUser = await Product.findById(req.params.productId);
    if (existUser)
        return res
            .status(400)
            .json({ msg: "Product already exists.", status: "error" });

    let ChargesData = StanderValues(req.body.category);
    let Discount = (req.body.basePrice * ChargesData.discount) / 100;
    let DiscountedPrice = req.body.basePrice - Discount;
    let GST = (DiscountedPrice * ChargesData.gst) / 100;
    let DCharge = ChargesData.delivery;
    let finalPrice = DiscountedPrice + GST + DCharge;

    let Charges = [
        {
            gst: GST,
            delivery: DCharge,
        },
    ];

    const product = new Product({
        productId: req.body.productId,
        name: req.body.name,
        productType: req.body.productType,
        category: req.body.category,
        basePrice: req.body.basePrice,
        discount: Discount,
        charges: Charges,
        finalPrice: finalPrice,
    });

    try {
        await product.save();
        res.status(201).json({
            msg: "Product details added successfully",
            status: "success",
        });
    } catch (err) {
        res.status(400).json(err);
    }
};

//*-----------------------* Getting All Product Data *-----------------------*//

exports.getProduct = async (req, res, next) => {
    try {
        let product = await Product.find();
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json(err);
    }
};

//*-----------------------* Getting All Product Data by Id *-----------------------*//

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product)
            return res
                .status(400)
                .send({ msg: "Product not exists.", status: "error" });
        res.status(200).send(product);
    } catch (err) {
        res.status(400).send(err);
    }
};

//*-----------------------* Update Product Data By Id *-----------------------*//

exports.updateProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.productId);
    if (!product)
        return res
            .status(400)
            .send({ msg: "Product not exists.", status: "error" });

    console.log(req.body);

    let Discount, GST, DCharge, finalPrice, Charges;
    if (req.body.basePrice) {
        let ChargesData = StanderValues(product.category);
        Discount = (req.body.basePrice * ChargesData.discount) / 100;
        let DiscountedPrice = req.body.basePrice - Discount;
        GST = (DiscountedPrice * ChargesData.gst) / 100;
        DCharge = ChargesData.delivery;
        finalPrice = DiscountedPrice + GST + DCharge;

        Charges = [
            {
                gst: GST,
                delivery: DCharge,
            },
        ];
    }

    const data = {
        productId: req.body.productId || product.productId,
        name: req.body.name || product.name,
        productType: req.body.productType || product.productType,
        category: req.body.category || product.category,
        basePrice: req.body.basePrice || product.basePrice,
        discount: Discount || product.discount,
        charges: Charges || product.charges,
        finalPrice: finalPrice || product.finalPrice,
    };

    try {
        await Product.findByIdAndUpdate(req.params.productId, data, {
            new: true,
        });
        res.status(200).json({
            msg: "You have successfully updated your account..!",
            status: "success",
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

//*-----------------------* Delete Product Data By Id *-----------------------*//

exports.deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndRemove(req.params.productId);
        res.status(200).json({
            msg: "You have successfully deleted your account..!",
            status: "success",
        });
    } catch (err) {
        res.status(400).send(err);
    }
};
