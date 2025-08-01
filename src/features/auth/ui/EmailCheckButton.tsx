import { useState } from 'react';

export const EmailCheckButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = async () => {
    setIsLoading(true);
  };

  return <button>Check Availability</button>;
};
