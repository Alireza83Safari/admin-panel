import React, { useContext, useState } from "react";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import ReactDOM from "react-dom";
import EditProductData from "./EditProductData";
import EditProductFile from "./EditProductFile";

export default function EditProduct() {
  const { showEditModal } = useContext(ProductsPanelContext);
  const [showEditFile, setShowEditFile] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(true);

  return ReactDOM.createPortal(
    <section
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showEditModal ? "visible" : "invisible"
      }`}
    >
      <div className="lg:w-[30rem] h-[33rem] bg-white-100 dark:bg-black-200  p-5 rounded-xl relative">
        {showEditProduct && (
          <EditProductData
            setShowEditProduct={setShowEditProduct}
            setShowEditFile={setShowEditFile}
          />
        )}
        {showEditFile && <EditProductFile setShowEditFile={setShowEditFile} />}
      </div>
    </section>,
    document.getElementById("portal")
  );
}
