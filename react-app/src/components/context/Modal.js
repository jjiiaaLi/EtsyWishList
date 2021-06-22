import React, { useState } from "react";
import Modal from "./Modal";
import "./index.css"
function ModalComp() {
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <div className="ModalComp">
      {!show && <button onClick={openModal}>Create Wishlist</button>}
      <Modal closeModal={closeModal} show={show} />
    </div>
  );
}

export default ModalComp;