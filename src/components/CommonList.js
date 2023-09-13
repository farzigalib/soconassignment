import React from "react";

const CommonList = ({
    imgURL,
    title,
    description,
    price,
    discount,
    rating,
}) => {
    return (
        <div className="list-container">
            <div className="img-title-container">
                <div className="list-img-conatiner">
                    <img alt="list-thumbnail" className="list-img" src={imgURL} />
                </div>
                <div className="text-container">
                    <div className="title">{title}</div>
                    <div className="description" style={{ marginTop: 5, marginBottom: 5 }}>{description}</div>
                    <div className="price">
                        $ {price} <span className="discount">{`${discount} %`}</span>
                        <span className="description" style={{ color: "black" }}>
                            {" "}
                            Discount
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <div className="rating">Rating</div>
                <div className="discount rate">
                    <span style={{ color: Number(rating) > 3.5 ? "green" : "red" }}>
                        {rating}
                    </span>
                    /5
                </div>
            </div>
        </div>
    );
};

export default CommonList;
