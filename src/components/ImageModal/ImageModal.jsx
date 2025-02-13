import "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

const ImageModal = ({ image, onClose }) => (
  <Modal
    isOpen={!!image}
    onRequestClose={onClose}
    contentLabel="Image Modal"
    className={s.modal}
  >
    <div onClick={onClose} className={s.box}>
      {image?.urls?.regular && (
        <img
          src={image.urls.regular}
          alt={image.alt_description || "Image"}
          className={s.img}
        />
      )}
      <div className={s.info}>
        <p className={s.p}>
          <b>Author:</b>
          {image?.user?.first_name} <span>{image?.user?.last_name}</span>
        </p>
        <p className={s.p}>
          <b>Likes:</b>
          {image?.likes}
        </p>
      </div>
    </div>
  </Modal>
);

export default ImageModal;