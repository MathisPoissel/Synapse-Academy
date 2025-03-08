import { useState, useEffect } from "react";

const useExample = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    console.log("Hook mounted or updated:", value);
  }, [value]);

  const updateValue = (newValue) => {
    setValue(newValue);
  };

  return [value, updateValue];
};

export default useExample;
