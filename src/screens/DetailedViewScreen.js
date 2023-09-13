import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const DetailedViewScreen = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const [singleProductData, setSingleProductData] = useState({});
    const [showImage, setShowImage] = useState(null);

    useEffect(() => {
        console.log(location.state.detailedData);
        if (location.state.detailedData) {
            setSingleProductData(location.state.detailedData);
        }
    }, [location.state.detailedData]);

    const goBack = () => {
        navigation(-1);
    };

    return (
        <div className="main">
            {Object.keys(singleProductData)?.length === 0 ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <React.Fragment>
                    <header>
                        <div onClick={goBack}>
                            <IoMdArrowRoundBack className="back-btn" />
                        </div>
                        <div
                            style={{
                                width: 2,
                                height: 50,
                                backgroundColor: "#000000",
                                marginLeft: 10,
                                borderRadius: 50,
                            }}
                        ></div>
                        <div className="title main-title">{singleProductData?.title}</div>
                    </header>
                    <div className="main-content">
                        <div className="image-container">
                            <img
                                className="large-img"
                                alt="product-img"
                                src={showImage ? showImage : singleProductData?.thumbnail}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    gap: 5,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                {singleProductData?.images?.map((ele, idx) => (
                                    <div key={idx}>
                                        <img
                                            className="small-img"
                                            alt="product-small-img"
                                            onClick={() => setShowImage(ele)}
                                            src={ele}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="description-container">
                            <div className="price-view price">
                                $ {singleProductData?.price}{" "}
                                <span className="discount">{`${singleProductData?.discountPercentage} %`}</span>
                                <span className="description" style={{ color: "black" }}>
                                    {" "}
                                    Discount
                                </span>
                            </div>
                            <div className="title title-view">
                                Brand :-{" "}
                                <span
                                    style={{ fontWeight: "400", textTransform: "capitalize" }}
                                >
                                    {singleProductData?.brand}
                                </span>
                            </div>
                            <div className="title title-view">
                                Category :-{" "}
                                <span
                                    style={{ fontWeight: "400", textTransform: "capitalize" }}
                                >
                                    {singleProductData?.category}
                                </span>
                            </div>
                            <div>
                                <div
                                    className="title title-view"
                                    style={{ textDecoration: "underline" }}
                                >
                                    Description
                                </div>
                                <div style={{ fontWeight: "400", textTransform: "capitalize" }}>
                                    {singleProductData?.description}
                                </div>
                            </div>
                            <div className="title title-view">
                                Rating :-{" "}
                                <span
                                    style={{
                                        fontWeight: "400",
                                        textTransform: "capitalize",
                                        color:
                                            Number(singleProductData?.rating) > 3.5 ? "green" : "red",
                                    }}
                                >
                                    {singleProductData?.rating}
                                </span>
                                /
                                <span
                                    style={{
                                        fontWeight: "400",
                                    }}
                                >
                                    5
                                </span>
                            </div>
                            <div className="title title-view">
                                Stock :-{" "}
                                <span
                                    style={{ fontWeight: "400", textTransform: "capitalize" }}
                                >
                                    {singleProductData?.stock}
                                </span>
                            </div>
                            <button className="first-last-btn">Buy Now</button>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default DetailedViewScreen;
