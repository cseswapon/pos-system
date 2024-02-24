// eslint-disable-next-line react/prop-types
export default function ProductFilter({ products, setState }) {
  const handleClick = (type) => {
    // eslint-disable-next-line react/prop-types
    const { product } = products.find((item) => item.type === type);
    setState(product);
  };
  return (
    <>
      <button
        className="border border-blue-300 rounded px-3 py-2 my-2 mx-1"
        // eslint-disable-next-line react/prop-types
        onClick={() => setState(products.flatMap(({ product }) => product))}
      >
        All Product
      </button>
      <button
        className="border border-blue-300 rounded px-3 py-2 my-2 mx-1"
        onClick={() => handleClick("lifeStyle")}
      >
        Life Style
      </button>
      <button
        className="border border-blue-300 rounded px-3 py-2 my-2 mx-1"
        onClick={() => handleClick("electronics")}
      >
        Electronics
      </button>
      <button
        className="border border-blue-300 rounded px-3 py-2 my-2 mx-1"
        onClick={() => handleClick("menFashion")}
      >
        Men Fashion
      </button>
      <button
        className="border border-blue-300 rounded px-3 py-2 my-2 mx-1"
        onClick={() => handleClick("womenFashions")}
      >
        Women Fashion
      </button>
      <button
        className="border border-blue-300 rounded px-3 py-2 my-2 mx-1"
        onClick={() => handleClick("accessories")}
      >
        Accessories
      </button>
      <button
        className="border border-blue-300 rounded px-3 py-2 my-2 mx-1"
        onClick={() => handleClick("homeDecor")}
      >
        Home Decor
      </button>
    </>
  );
}
