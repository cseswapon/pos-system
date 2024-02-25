import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit, FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { HiCurrencyDollar } from "react-icons/hi";

// eslint-disable-next-line react/prop-types
export default function CardList({
  item,
  handelCartDelete,
  filterArray,
  setFilterArray,
}) {
  const [total, setTotal] = useState(1);
  const handleTotalChange = (newValue, id) => {
    const updatedFilterArray = filterArray.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newValue };
      }
      return item;
    });

    setFilterArray(updatedFilterArray);

    setTotal(newValue);
  };
  return (
    <>
      <div className="flex items-center justify-between px-32 my-2">
        {/* eslint-disable-next-line react/prop-types */}
        <p>
          <FaEdit className="inline-block me-2" />
          {item.name}
        </p>
        {/* eslint-disable-next-line react/prop-types */}
        <p>${item.price}</p>
        <div className="flex items-center">
          <button
            disabled={total === 1}
            onClick={() => handleTotalChange(total - 1, item.id)}
          >
            <TiMinus />
          </button>
          <span>{total}</span>
          <button onClick={() => handleTotalChange(total + 1, item.id)}>
            <FaPlus />
          </button>
        </div>
        {/* eslint-disable-next-line react/prop-types */}
        <p>
          <HiCurrencyDollar className="inline-block text-[1.3rem] me-2" />
          {Number(item.price) * total || Number(item.price)}
        </p>
        <button
          // eslint-disable-next-line react/prop-types
          onClick={() => handelCartDelete(item.id)}
          className="text-red-500"
        >
          <AiOutlineDelete className="text-[1.3rem]" />
        </button>
      </div>
    </>
  );
}
