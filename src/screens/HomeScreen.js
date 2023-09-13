import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommonList from "../components/CommonList";

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchPosts = async (limit, skip) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setProductData(result);
        console.log(result);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickFirst = () => {
    fetchPosts(20, 0);
  };

  const handleClickPrev = () => {
    fetchPosts(20, Number(productData?.products[0]?.id - 1 - 20));
  };

  const handleClickLast = () => {
    fetchPosts(20, Number(productData?.total - 20));
  };

  const handleClickNext = () => {
    fetchPosts(
      20,
      Number(productData?.products[productData?.products?.length - 1]?.id)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = productData?.products?.filter(
          (item) =>
            item?.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.description.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  useEffect(() => {
    fetchPosts(20, 0);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <React.Fragment>
          <header style={{ justifyContent: "space-around" }}>
            <div className="title main-title">Products List</div>
            <input
              type="text"
              name="text"
              placeholder="Search Product"
              value={searchText}
              onChange={handleSearchChange}
            />
          </header>
          <div className="main-container">
            {searchText ? (
              <React.Fragment>
                {searchedResults?.map((ele, idx) => (
                  <Link
                    to={`/detailed-view/${ele?.id}`}
                    state={{ detailedData: ele }}
                    key={idx}
                    className="list-click"
                  >
                    <CommonList
                      imgURL={ele.thumbnail}
                      title={ele?.title}
                      description={ele?.description}
                      price={ele?.price}
                      discount={ele?.discountPercentage}
                      rating={ele?.rating}
                    />
                  </Link>
                ))}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {productData?.products?.map((ele, idx) => (
                  <Link
                    to={`/detailed-view/${ele?.id}`}
                    state={{ detailedData: ele }}
                    key={idx}
                    className="list-click"
                  >
                    <CommonList
                      imgURL={ele.thumbnail}
                      title={ele?.title}
                      description={ele?.description}
                      price={ele?.price}
                      discount={ele?.discountPercentage}
                      rating={ele?.rating}
                    />
                  </Link>
                ))}
                <div className="btn-container">
                  <button
                    onClick={handleClickFirst}
                    className="first-last-btn btn"
                  >
                    First
                  </button>
                  <button
                    onClick={handleClickPrev}
                    className="prev-next-btn btn"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleClickNext}
                    className="prev-next-btn btn"
                  >
                    Next
                  </button>
                  <button onClick={handleClickLast} className="first-last-btn">
                    Last
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default HomeScreen;
