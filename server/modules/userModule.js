const User = require("../model/User");

//*---------------------------* Get All Users From DataBase *---------------------------*//

exports.getUser = async (req, res) => {
    try {
        let data = await User.find();
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
};

//*---------------------------* Get User By ID From DataBase *---------------------------*//

exports.getUserById = async (req, res) => {
    try {
        const post = await User.findById(req.params.userId);
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
};

//*---------------------------* Delete User By Id *---------------------------*//

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.userId);
        res.status(200).json({
            msg: "You have successfully deleted your account..!",
            status: "success",
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

//*---------------------------* Save The Product *---------------------------*//

exports.cartOperation = async (req, res, next) => {
    try {
        let product;
        if (req.body.quantity !== 0) {
            let addNew = true;
            let cartItem = await User.findById(req.params.userId);
            await cartItem.cart.forEach((e) => {
                if (e.productId === req.body.productId) addNew = false;
            });

            addNew
                ? (product = await addProduct(req))
                : (product = await UpdateProduct(req));
        } else {
            product = await removeProduct(req);
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

//*---------------------* Add To Cart *---------------------*//
const addProduct = async (req) => {
    let cartItem = await User.findById(req.params.userId);
    let cart = {
        _id: req.params._Id,
        productId: req.body.productId,
        quantity: req.body.quantity,
    };

    cartItem.cart.push(cart);
    let product = await cartItem.save();
    return product;
};

//*---------------------* Update The Cart *---------------------*//
const UpdateProduct = async (req) => {
    await User.updateOne(
        { "cart._id": req.params._Id },
        {
            $set: { "cart.$.quantity": req.body.quantity },
        }
    );
    let product = await User.findById(req.params.userId);
    return product;
};

//*---------------------* Remove From Cart *---------------------*//
const removeProduct = async (req) => {
    let product = await User.findByIdAndUpdate(
        req.params.userId,
        {
            $pull: { cart: { productId: req.body.productId } },
        },
        { new: true }
    );
    return product;
};
