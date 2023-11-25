import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetProductsQuery } from "@api";
import { RingLoader } from "react-spinners";

export default function ProductList({ onAddToCart, isProductInCart }) {
  const { data, isLoading } = useGetProductsQuery();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (data && data.details) {
      setItems(data.details.slice(0, 5));
      setHasMore(data.details.length > 5);
    }
  }, [data]);

  const fetchMoreData = () => {
    const currentLength = items.length;
    const newItems =
      data?.details.slice(currentLength, currentLength + 5) || [];

    if (newItems.length > 0) {
      setItems([...items, ...newItems]);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more items</p>}
        >
          <div className="container mx-auto my-8 p-8 max-w-screen-xl bg-white">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Product List
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {items.map((product) => (
                <div
                  key={product?._id}
                  className="border p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="mb-4">
                    {product?.image?.map((image, index) => (
                      <img
                        key={index}
                        src={image?.url}
                        alt={product?.product_name}
                        className="w-full h-32 object-cover mb-2"
                      />
                    ))}
                  </div>
                  <p className="text-lg font-semibold mb-2">
                    {product?.product_name}
                  </p>
                  <button
                    onClick={() => onAddToCart(product)}
                    disabled={isProductInCart(product._id)}
                    className={`${
                      isProductInCart(product._id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    } py-2 px-4 rounded-full transition duration-300`}
                  >
                    {isProductInCart(product._id) ? "In Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}
