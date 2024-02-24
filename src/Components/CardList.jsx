import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function CardList({item,handelCartDelete}) {
  const [total, setTotal] = useState(1);
  const handleTotalChange = (newValue) => {
    // eslint-disable-next-line react/prop-types
    item.quantity = newValue;
      setTotal(newValue);
      
  };
  return (
    <>
      <div className="flex items-center justify-between px-32 my-2">
        {/* eslint-disable-next-line react/prop-types */}
        <p>{item.name}</p>
        {/* eslint-disable-next-line react/prop-types */}
        <p>${item.price}</p>
        <div className="flex items-center">
          <button
            disabled={total === 1}
            onClick={() => handleTotalChange(total - 1)}
          >
            -
          </button>
          <span>{total}</span>
          <button onClick={() => handleTotalChange(total + 1)}>+</button>
        </div>
        {/* eslint-disable-next-line react/prop-types */}
        <p>${Number(item.price) * total || Number(item.price)}</p>
        <button
          // eslint-disable-next-line react/prop-types
          onClick={() => handelCartDelete(item.id)}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    </>
  );
}
