function Modal({ children, handleModal }) {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full bg-slate-500 opacity-80 z-10"
        onClick={handleModal}
      ></div>
      {children}
    </>
  );
}

export default Modal;
