import React, { useState } from "react";


function modal() {
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <div className="modal">
      <h1>Creating react modal</h1>
      {!show && <button onClick={openModal}>Show modal</button>}
    </div>
  );
}

export default modal;