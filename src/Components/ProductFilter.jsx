import { useState } from "react";

export default function ProductFilter({ products, setState }) {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (type) => {
    const { product } = products.find((item) => item.type === type);
    setState(product);
    setActiveButton(type);
  };

  return (
    <>
      <button
        className={`border rounded px-3 py-2 my-3 mx-[0.5rem] ms-0 text-[0.8rem] md:text-[1.14rem] ${
          activeButton === null &&
          "text-blue-800 border-blue-800 font-bold border-2"
        } ${activeButton === null ? "active" : ""}`}
        onClick={() => {
          setState(products.flatMap(({ product }) => product));
          setActiveButton(null);
        }}
      >
        All Product
      </button>
      {[
        "lifeStyle",
        "electronics",
        "menFashion",
        "womenFashions",
        "accessories",
        "homeDecor",
        "⋮",
      ].map((type) => (
        <button
          key={type}
          className={`border rounded px-3 py-2 my-3 mx-1 text-[0.8rem] md:text-[1.14rem] ${
            activeButton === type &&
            "text-blue-800 border-blue-800 font-bold border-2"
          } ${activeButton === type ? "active" : ""}`}
          onClick={() => handleClick(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </>
  );
}
