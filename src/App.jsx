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
      const newItems = filteredItems.filter(
        (item) => !prevFilterArray.find((prevItem) => prevItem.id === item.id)
      );
      return [...prevFilterArray, ...newItems];
    });
  }, [addCart, allProduct]);

  const handelCartDelete = (id) => {
    const removeData = filterArray.filter((item) => item.id !== id);
    setFilterArray(removeData);
    setAddCart((prevAddCart) => prevAddCart.filter((cartId) => cartId !== id));
  };

  const [amount, setAmount] = useState({
    subTotal: 0,
    tax: 0.03,
    shipping: 50,
    discount: 0.02,
    total: 0,
  });

  useEffect(() => {
    let subTotal = 0;

    for (const item of filterArray) {
      subTotal += Number(item.price) * item.quantity;
    }
    
    const tax = subTotal * amount.tax;
    const total = subTotal + tax + amount.shipping;

    setAmount((prevAmount) => ({
      ...prevAmount,
      subTotal: subTotal.toFixed(2),
      total: total.toFixed(2),
    }));
  }, [filterArray, amount.tax, amount.shipping]);

  // console.log(amount);

  return (
    <div className="grid md:grid-cols-2">
      <div className="gird-cols-1 md:h-screen overflow-y-scroll bg-white-50">
        <div className="grid grid-cols-5 gap-4 m-4">
          <button className="p-2 ">
            <IoReorderThree className="inline-block text-[2rem] text-blue-700 font-bold" />
          </button>
          <button className="flex items-center justify-around bg-blue-100 text-blue-700 font-bold p-2 rounded">
            <PiNotePencilBold className="inline-block text-[2rem]" /> Note
          </button>
          <button className="flex items-center justify-around bg-blue-100 text-blue-700 font-bold p-2 rounded">
            <LiaShippingFastSolid className="inline-block text-[2rem]" />{" "}
            Shipping
          </button>
          <button className="flex items-center justify-around bg-blue-100 text-blue-700 font-bold p-2 rounded">
            <TbPlaceholder className="inline-block text-[2rem]" /> Hold Order
          </button>
          <button className="flex items-center justify-around bg-blue-100 text-blue-700 font-bold p-2 rounded">
            <IoMdAddCircle className="inline-block text-[2rem]" /> New Item
          </button>
        </div>

        <div className="flex justify-between bg-blue-100 text-blue-700 p-4 my-5 ">
          <div className="flex items-center">
            <FaUserCircle className="inline-block me-5 text-[2rem]" />
            <h1 className="font-bold">Swapon Saha</h1>
          </div>
          <IoMdAddCircle className="inline-block text-[2rem]" />
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
          {filterArray.length > 0 && (
            <>
              <div className="my-3 w-[30%] block float-right mx-3">
                <div className="flex items-center justify-between border border-t-2 border-r-0 border-b-0 border-l-0 p-2">
                  <p>Sub Total</p>
                  <p>${amount.subTotal}</p>
                </div>
                <div className="flex items-center justify-between border border-t-2 border-r-0 border-b-0 border-l-0 p-2">
                  <p>Tax (30%)</p>
                  <p>${amount.tax}</p>
                </div>
                <div className="flex items-center justify-between border border-t-2 border-r-0 border-b-0 border-l-0 p-2">
                  <p>Shipping</p>
                  <p>${amount.shipping}</p>
                </div>
                <div className="flex items-center justify-between border border-t-2 border-r-0 border-b-0 border-l-0 p-2">
                  <p className="text-blue-500">Discount on Cart (2%)</p>
                  <p>${amount.discount}</p>
                </div>
              </div>
              <div className="flex justify-between bg-blue-200 text-blue-500 my-3 p-4 mt-[22%] mx-4">
                <div>
                  <p>Products Count ({filterArray.length})</p>
                </div>
                <div className="flex text-2xl">
                  <h3 className="me-10 font-bold">Total</h3>
                  <h1>${amount.total}</h1>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-5 mx-4">
                <button className="col-span-1 flex items-center justify-around bg-red-200 p-3 rounded text-[1.5rem] text-red-500">
                  <GiCancel /> Cancel
                </button>
                <button className="col-span-1 flex items-center justify-around bg-blue-100 p-3 rounded text-[1.5rem] text-blue-500">
                  <FaRegHandBackFist /> Hold
                </button>
                <button className="col-span-1 flex items-center justify-around bg-blue-100 p-3 rounded text-[1.5rem] text-blue-500">
                  <GiPayMoney /> Discount
                </button>
                <button className="col-span-1 flex items-center justify-around bg-blue-100 p-3 rounded text-[1.5rem] text-blue-500">
                  <FaHandHoldingDollar /> Pay Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="grid-cols-1 md:h-screen overflow-y-scroll bg-gray-50 pb-7 border border-l-2 border-r-0 border-b-2 ">
        <div>
          <div className="flex justify-between items-center shadow w-full px-5 py-3 mb-5">
            <div className="flex items-center">
              <FaSearch className="text-[1.5rem] text-gray-500" />
              <input
                onChange={(e) => {
                  const inputValue = e.target.value.toLowerCase();
                  const filterData =
                    inputValue.length !== 0
                      ? state.filter(
                          (item) =>
                            item.name.toLowerCase().includes(inputValue) ||
                            item.id.toString().includes(inputValue)
                        )
                      : products
                          .map((item) =>
                            item.product.map((product) => product).flat()
                          )
                          .flat();
                  // console.log(filterData, inputValue);
                  setState(filterData);
                }}
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
