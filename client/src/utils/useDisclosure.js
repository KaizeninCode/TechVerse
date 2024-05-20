import { useState } from "react";

const useDisclosure = (initialState = {}) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const handleDisclose = (id) => {
    setIsOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return { isOpen, handleDisclose };
};

export default useDisclosure;
