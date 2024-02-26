import { Fragment, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit, FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { HiCurrencyDollar } from "react-icons/hi";

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
    <div className="grid grid-cols-8 p-2">
      <div className="col-span-1 flex items-center justify-center text-slate-500">
        <FaEdit className="text-[2rem]" />
      </div>
      <div className="col-span-6">
        <Fragment>
          <div className="grid grid-cols-4 gap-4 border p-3 text-slate-500">
            <div className="col-span-1">{item.name}</div>
            <div className="col-span-1 flex items-center justify-center">
              ${item.price}
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <button
                disabled={total === 1}
                onClick={() => handleTotalChange(total - 1, item.id)}
                className={`text-white bg-gray-300 p-1 rounded-full ${
                  total === 1
                    ? "cursor-not-allowed"
                    : "hover:text-black hover:cursor-pointer"
                }`}
              >
                <TiMinus />
              </button>
              <span className="mx-2">{total}</span>
              <button
                onClick={() => handleTotalChange(total + 1, item.id)}
                className={`text-white bg-gray-300 p-1 rounded-full 
                    ? "cursor-not-allowed"
                    : "hover:text-black hover:cursor-pointer"
                }`}
              >
                <FaPlus />
              </button>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p className="flex items-center">
                <HiCurrencyDollar className="inline-block text-[1.3rem] mr-1" />
                {Number(item.price) * total || Number(item.price)}
              </p>
            </div>
          </div>
        </Fragment>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <button
          onClick={() => handelCartDelete(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          <AiOutlineDelete className="text-[2rem]" />
        </button>
      </div>
    </div>
  );
}
