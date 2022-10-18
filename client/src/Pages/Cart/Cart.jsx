import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./cart.css";
import Popup from "../../Components/Popup/Popup";
import { Skeleton, Box, IconButton } from "@mui/material";
import { DeleteForeverTwoTone } from "@mui/icons-material";
import Navbar from "../../Components/Navbar/Navbar";

const Cart = ({ URL }) => {
    const [Warning, setWarning] = useState("");
    const [items, setItems] = useState("");
    const [cart, setCart] = useState([]);
    const [temp, setTemp] = useState([]);
    const FetchRef = useRef();

    useEffect(() => {
        FetchRef.current();
    }, [Warning]);

    let Fetch = async () => {
        try {
            let cartData = await axios.get(
                `${URL}/user/get/634a51c4bc2534a35d57bcc4`
            );
            let arr = cartData.data.cart.map((e) => e._id);
            CartMap(cartData);
            let Products = await axios.get(`${URL}/product/get/all`);
            setItems(Products.data.filter((e) => arr.includes(e._id)));
        } catch {
            setWarning({ status: "error", msg: `Something went wrong` });
        }
    };

    FetchRef.current = Fetch;

    const CartMap = (e) => {
        let data = new Map();
        e.data.cart.forEach((e) => data.set(e._id, e));
        setCart(data);
        setTemp(e.data.cart.map((i) => i._id));
    };

    const Quantity = async (val, e) => {
        if (val >= 1) {
            let data = {
                productId: e.productId,
                quantity: val,
            };

            try {
                await axios.patch(
                    `${URL}/user/cart/634a51c4bc2534a35d57bcc4/${e._id}`,
                    data
                );
                FetchRef.current();
            } catch {
                setWarning({ status: "error", msg: `Something went wrong` });
            }
        }
    };

    const Remove = async (e, type) => {
        let data = {
            productId: e.productId,
            quantity: 0,
        };
        try {
            let update = await axios.patch(
                `${URL}/user/cart/634a51c4bc2534a35d57bcc4/${e._id}`,
                data
            );

            CartMap(update);
            setWarning({ status: "success", msg: type });
        } catch {
            setWarning({ status: "error", msg: `Something went wrong` });
        }
    };

    return (
        <>
            <Navbar page="Cart" />
            <div className="app_container cart">
                {items ? (
                    items.length !== 0 ? (
                        <div className="cart_inner">
                            {items
                                .filter((e) => temp.includes(e._id))
                                .map((item) => (
                                    <div
                                        className="cart_card_outer"
                                        key={item.productId}
                                    >
                                        <div className="details">
                                            <div className="name">
                                                {item.name}
                                            </div>
                                            <div className="type">
                                                {item.productType}
                                            </div>
                                            <div className="category">
                                                {item.category}
                                            </div>
                                        </div>
                                        <div className="pricing">
                                            <div className="price">
                                                <span>Price :</span>
                                                <span>₹{item.basePrice}</span>
                                            </div>
                                            <div className="price">
                                                <span>Discount (15%) :</span>
                                                <span>₹{item.discount}</span>
                                            </div>
                                            <div className="price">
                                                <span>GST(18%) :</span>
                                                <span>
                                                    ₹{item.charges[0].gst}
                                                </span>
                                            </div>
                                            <div className="price">
                                                <span>Delivery :</span>
                                                <span>
                                                    ₹{item.charges[0].delivery}
                                                </span>
                                            </div>
                                            <div className="price">
                                                <span>Final Price :</span>
                                                <span
                                                    style={{ fontWeight: 600 }}
                                                >
                                                    ₹
                                                    {item.finalPrice *
                                                        cart.get(item._id)
                                                            .quantity}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="cart_quantity">
                                            <span className="quantity">
                                                <button
                                                    className="counter"
                                                    onClick={() =>
                                                        Quantity(
                                                            cart.get(item._id)
                                                                .quantity - 1,
                                                            item
                                                        )
                                                    }
                                                    disabled={
                                                        cart.get(item._id)
                                                            .quantity < 2
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    name="quantity"
                                                    id="quantity"
                                                    value={
                                                        cart.get(item._id)
                                                            .quantity
                                                            ? cart.get(item._id)
                                                                  .quantity
                                                            : () =>
                                                                  Quantity(
                                                                      cart.get(
                                                                          item._id
                                                                      )
                                                                          .quantity -
                                                                          1,
                                                                      item
                                                                  )
                                                    }
                                                    disabled
                                                />
                                                <button
                                                    className="counter"
                                                    onClick={() =>
                                                        Quantity(
                                                            cart.get(item._id)
                                                                .quantity + 1,
                                                            item
                                                        )
                                                    }
                                                    disabled={
                                                        cart.get(item._id)
                                                            .quantity > 9
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    +
                                                </button>
                                            </span>
                                            <span className="quantity">
                                                <button
                                                    className="buy_button"
                                                    onClick={() =>
                                                        Remove(
                                                            item,
                                                            "Your order is placed."
                                                        )
                                                    }
                                                >
                                                    Buy
                                                </button>
                                                <IconButton
                                                    onClick={() =>
                                                        Remove(
                                                            item,
                                                            `${item.name} removed from the cart.`
                                                        )
                                                    }
                                                    sx={{ p: 1 }}
                                                    title="Remove Item"
                                                >
                                                    <DeleteForeverTwoTone
                                                        sx={{
                                                            fontSize: "1.6rem",
                                                            color: "tomato",
                                                        }}
                                                    />
                                                </IconButton>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <h2 style={{ textAlign: "center" }}>
                            No Items Added Yet..!
                        </h2>
                    )
                ) : (
                    <>
                        <h2 style={{ textAlign: "center" }}>Loading...</h2>
                        {[...new Array(20)].map((e, i) => (
                            <Box sx={{ mt: 1, mb: 1 }} key={i}>
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={160}
                                />
                            </Box>
                        ))}
                    </>
                )}
            </div>
            {Warning === "" ? null : (
                <Popup
                    security={Warning.status}
                    message={Warning.msg}
                    Warning={setWarning}
                />
            )}
        </>
    );
};

export default Cart;
