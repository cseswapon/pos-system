import {  useEffect, useState } from "react";
import { products } from "./services/products";
import "react-lazy-load-image-component/src/effects/blur.css";
import Card from "./Components/Card";
import "./App.css";
import ProductFilter from "./Components/ProductFilter";
import CardList from "./Components/CardList";

function App() {
  const [state, setState] = useState(
    products.map((item) => item.product.map((product) => product).flat()).flat()
  );

  const [addCart, setAddCart] = useState([]);
  // const [subTotal, setSubTotal] = useState(1);
  // const [grandTotal, setGrandTotal] = useState(1);

  const handelAddCartList = (id) => {
    if (addCart.includes(id)) return addCart;
    setAddCart([...addCart, id]);
  };

  const allProduct = products.map((item) => item.product.flat()).flat();
  const filterArray = allProduct.filter((item) => addCart.includes(item.id));
  const filterArrayQuantity = filterArray.map((item)=>({...item,"quantity":1}))

  const handelCartDelete = (id) => {
    setAddCart(addCart.filter((itemId) => itemId !== id));
  };

  
  console.log(filterArrayQuantity);

  return (
    <div className="md:flex w-full">
      <div className="w-1/2">
        <div>
          {filterArrayQuantity.map((item, i) => (
            <CardList
              key={i}
              item={item}
              handelCartDelete={handelCartDelete}
              setAddCart={setAddCart}
            />
          ))}
          {/* <p>Sub Total : ${subTotal}</p>
          <p>Grand Total : ${grandTotal}</p> */}
        </div>
      </div>
      <div className="w-2/2 md:mr-5">
        <div>
          <ProductFilter products={products} setState={setState} />
        </div>
        <div className="bg-gray-50 grid md:grid-cols-5 md:gap-3">
          {state.map((item, i) => (
            <Card key={i} item={item} handelAddCartList={handelAddCartList} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
