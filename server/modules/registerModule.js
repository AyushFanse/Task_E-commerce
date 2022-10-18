const User = require("../model/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");

//*-----------------------* Registration Part *-----------------------*//

exports.user_register = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .lowercase()
      .min(6)
      .max(50)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().trim(true).required(),
    cart: Joi.object({
      productId: Joi.string().trim(true),
      quantity: Joi.number(),
    }),
  });
  
  var { error } = await schema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  var existUser = await User.findOne({
    email: req.body.email.toLowerCase(),
  }).exec();
  if (existUser)
    return res
      .status(400)
      .json({ msg: "Email already exists.", status: "error" });

  const salt = await bcrypt.genSalt(10);
  const Password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    password: Password,
    cart:req.body.cart ? req.body.cart : []
  });
  
  try {
    await user.save();
    res.status(201).json({
      msg: "You Have Successfully Registered Your Account..!",
      status: "success",
      data:user
    });
  } catch (err) {
    res.status(400).json(err);
  }
};