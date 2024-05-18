import { useState, useRef } from "react";

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);
  const commentRef = useRef(null);

  function handleDisclose() {
    if (commentRef.current) {
      setIsOpen(!isOpen);
    }
  }

  return { isOpen, handleDisclose, commentRef };
};

export default useDisclosure;
