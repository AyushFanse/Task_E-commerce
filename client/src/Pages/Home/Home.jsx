import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Popup from "../../Components/Popup/Popup";
import { Stack, Skeleton } from "@mui/material";
import axios from "axios";
import "./home.css";

const Home = ({ URL }) => {
    const [Warning, setWarning] = useState("");
    const [items, setItems] = useState([]);
    const [searches, setSearch] = useState("");
    const [cart, setCart] = useState([]);
    const FetchRef = useRef();

    useEffect(() => {
        FetchRef.current();
    }, [Warning]);

    let Fetch = async () => {
        try {
            let Products = await axios.get(`${URL}/product/get/all`);
            setItems(Products.data);
            let cartData = await axios.get(
                `${URL}/user/get/634a51c4bc2534a35d57bcc4`
            );
            setCart(cartData.data.cart.map((e) => e._id));
        } catch {
            setWarning({ status: "error", msg: `Something went wrong` });
        }
    };

    FetchRef.current = Fetch;

    const AddToCart = async (e) => {
        try {
            let val = cart.includes(e._id) ? 0 : 1;
            let data = {
                productId: e.productId,
                quantity: val,
            };

            let update = await axios.patch(
                `${URL}/user/cart/634a51c4bc2534a35d57bcc4/${e._id}`,
                data
            );

            setCart(update.data.cart.map((e) => e._id));

            setWarning({
                status: "success",
                msg: val
                    ? `${e.name} is added to the cart.`
                    : `${e.name} removed from the cart.`,
            });
        } catch {
            setWarning({ status: "error", msg: `Something went wrong` });
        }
    };

    return (
        <>
            <Navbar page="E-Commerce" cart={cart.length} search={setSearch} />
            <div className="app_container home">
                {items.length !== 0 ? (
                    <div className="inner_container">
                        {items
                            .filter((search) => {
                                if (searches === "") {
                                    return search;
                                } else if (
                                    search.name
                                        .toLowerCase()
                                        .includes(searches) ||
                                    search.productType
                                        .toLowerCase()
                                        .includes(searches) ||
                                    search.category
                                        .toLowerCase()
                                        .includes(searches)
                                ) {
                                    return search;
                                }
                                return false;
                            })
                            .map((item) => (
                                <div
                                    className="home_card_outer"
                                    key={item.productId}
                                >
                                    <div className="details">
                                        <div className="name">{item.name}</div>
                                        <div className="type">
                                            {item.productType}
                                        </div>
                                        <div className="price">
                                            ₹{item.finalPrice}
                                        </div>
                                    </div>
                                    <button
                                        className="buy_button"
                                        onClick={(i) => AddToCart(item)}
                                    >
                                        {cart.includes(item._id)
                                            ? "Remove"
                                            : "Add Me"}
                                    </button>
                                </div>
                            ))}
                    </div>
                ) : (
                    Array.from(new Array(20)).map((n, i) => (
                        <Stack spacing={1} id="inner_container" key={i}>
                            <Skeleton
                                variant="rectangular"
                                width={"100%"}
                                height={200}
                            />
                        </Stack>
                    ))
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

export default Home;
