import { useEffect, useState } from "react";
import { products } from "./services/products";
import "react-lazy-load-image-component/src/effects/blur.css";
import Card from "./Components/Card";
import "./App.css";
import ProductFilter from "./Components/ProductFilter";
import CardList from "./Components/CardList";
import { FaSearch, FaBarcode } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiNotePencilBold } from "react-icons/pi";
import { TbPlaceholder } from "react-icons/tb";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { FaRegHandBackFist } from "react-icons/fa6";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";


function App() {
  const [state, setState] = useState(
    products.map((item) => item.product.map((product) => product).flat()).flat()
  );
  const [addCart, setAddCart] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [allProduct, setAllProduct] = useState(
    products.map((item) => item.product.flat()).flat()
  );
  const handelAddCartList = (id) => {
    if (addCart.includes(id)) {
      alert("This Product Already Exist");
      return addCart;
    }
    setAddCart([...addCart, id]);
  };
  useEffect(() => {
    setFilterArray((prevFilterArray) => {
      const uniqueIds = new Set(prevFilterArray.map((item) => item.id));
      const filteredItems = allProduct.filter(
        (item) => addCart.includes(item.id) && !uniqueIds.has(item.id)
      );
      return [...prevFilterArray, ...filteredItems];
    });
  }, [addCart]);
  console.log(filterArray);
  const handelCartDelete = (id) => {
    setFilterArray((prevFilterArray) =>
      prevFilterArray.filter((item) => item.id !== id)
    );
  };
  return (
    <div className="md:flex w-full">
      <div className="w-1/2">
        <div className="flex">
          <IoReorderThree />
          <PiNotePencilBold />

          <LiaShippingFastSolid />
          <TbPlaceholder />

          <IoMdAddCircle />
        </div>
        <div>
          <div>
            <FaUserCircle />
            <h1>Swapon Saha</h1>
            <IoMdAddCircle />
          </div>
        </div>

        <div>
          {filterArray.map((item, i) => (
            <CardList
              key={i}
              item={item}
              handelCartDelete={handelCartDelete}
              filterArray={filterArray}
              setFilterArray={setFilterArray}
            />
          ))}
          <div>
            <p>total</p>
          </div>
          <div>
            <GiCancel />
            <FaRegHandBackFist />
            <GiPayMoney />
            <FaHandHoldingDollar />
          </div>
        </div>
      </div>
      <div className="w-2/2 md:h-screen overflow-y-scroll bg-gray-50 pb-7 border border-l-2 border-r-0 border-b-2 ">
        <div className="container mx-auto">
          <div className="flex justify-between items-center shadow w-full px-5 py-3 mb-5">
            <div className="flex items-center">
              <FaSearch className="text-[1.5rem] text-gray-500" />
              <input
                className="ms-4 p-2 bg-gray-50 focus:outline-0"
                type="text"
                placeholder="Search Products..."
              />
            </div>
            <FaBarcode className="text-[2rem]" />
          </div>
          <div className="px-5">
            <ProductFilter products={products} setState={setState} />
          </div>
          <div className="px-5 grid md:grid-cols-5 md:gap-3">
            {state.map((item, i) => (
              <Card key={i} item={item} handelAddCartList={handelAddCartList} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
