import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ children, onClose, closeOnClickOverlay = true }) {
  const closeByEsc = e => {
    if (e.code === 'Escape') {
      onClose(e);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeByEsc);

    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  const clickOnOverlay = e => {
    if (!closeOnClickOverlay) return;

    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return createPortal(
    <div className={style.overlay} onClick={clickOnOverlay}>
      <div className={style.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;
