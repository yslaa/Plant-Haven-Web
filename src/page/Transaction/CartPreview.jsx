import React, { useState } from "react";
import EmptyCartImage from "@assets/empty-cart.png";

export default function ({
  cartItems,
  onRemoveFromCart,
  onConfirmPurchase,
  onClose,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirmPurchase = () => {
    onConfirmPurchase();
    setModalOpen(false);
    onClose();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-center text-3xl font-semibold mb-6">Cart Preview</h3>
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div
            key={item?._id}
            className="flex justify-between items-center my-4 p-4 border-b"
          >
            <div className="flex flex-col">
              <div className="font-bold text-lg mb-1">{item.name}</div>
              <div className="mb-2">{item.description}</div>
              <div className="text-xl">{item.price} PHP</div>
              <div className="mt-2">
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => onRemoveFromCart(item)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div>
              {item?.image?.map((imageItem, index) => (
                <img
                  key={index}
                  src={imageItem?.url}
                  alt={imageItem?.alt}
                  className="w-20 h-20 m-1 rounded"
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center mt-14">
          <img
            src={EmptyCartImage}
            alt="Empty Cart"
            className="w-48 h-48 mx-auto mb-4"
          />
          <p className="text-lg">Your cart is empty.</p>
        </div>
      )}
      <div className="flex justify-center mt-4">
        {cartItems && cartItems.length > 0 ? (
          <button
            className="bg-blue-500 rounded-full text-white text-lg px-6 py-2 hover:bg-blue-600"
            onClick={() => setModalOpen(true)}
          >
            Confirm Purchase
          </button>
        ) : null}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-dark-default text-light-default dark:bg-light-default dark:text-dark-default p-4 rounded-md max-w-md">
            <h2 className="text-2xl font-bold mb-2">Confirm Purchase</h2>
            <p className="text-lg mb-4">
              Are you sure you want to purchase the selected items?
            </p>
            <div className="flex justify-end">
              <button
                className="text-red-500 hover:underline mr-2"
                onClick={() => {
                  setModalOpen(false);
                  onClose();
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                onClick={handleConfirmPurchase}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
