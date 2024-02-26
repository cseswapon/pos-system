import { LazyLoadImage } from "react-lazy-load-image-component";

// eslint-disable-next-line react/prop-types
export default function Card({ item, handelAddCartList }) {
  return (
    <>
      <div
        // eslint-disable-next-line react/prop-types
        onClick={() => handelAddCartList(item.id)}
        className="flex flex-col items-center justify-center bg-white border rounded p-3"
      >
        <LazyLoadImage
          className="w-auto"
          alt="avatar"
          effect="blur"
          src="/images/noImage.png"
        />

        {/* eslint-disable-next-line react/prop-types */}
        <p className="bg-gray-100 py-2 w-full text-center">${item?.price} </p>
        <p className="text-center border-t-2 pt-3 w-full mt-3 text-[13px]">
        {/* eslint-disable-next-line react/prop-types */}
          {item?.name.toString().slice(0, 20) + "..."}
        </p>
      </div>
    </>
  );
}
