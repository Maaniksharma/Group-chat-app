// usePopup.js
import { useState } from 'react';

const usePopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupInfo, setPopupinfo] = useState({ Title: '', Text: '' });

  const ShowPopup = (title, text) => {
    setPopupinfo({ Title: title, Text: text });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return { isPopupOpen, popupInfo, ShowPopup, closePopup };
};

export default usePopup;
