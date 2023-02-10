import { useEffect, useState } from 'react';

function useBrace(refContainer, visibleContacts, filterValue) {
  const [bracersNumber, setBracersNumber] = useState(null);

  useEffect(() => {
    const containerHeight = refContainer.current.getBoundingClientRect().height;
    const step = 115;

    Math.floor(containerHeight / (step + 15)) > 3
      ? setBracersNumber(Math.floor(containerHeight / step))
      : setBracersNumber(3);
  }, [refContainer, visibleContacts, filterValue]);

  return bracersNumber;
}

export default useBrace;
