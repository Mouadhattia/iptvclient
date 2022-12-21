import { replace } from 'lodash';
import numeral from 'numeral';
import { useEffect, useState } from 'react';

export const formatPrice = (price) => {
  return  price +" DT"
};
export function fShortenNumber(number) {
  return replace(numeral(number).format("0.a"), ".00", "");
}


export function formateDate(data){
  let d = new Date(data)
  return d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
  d.getHours() + ":" + d.getMinutes();
}

export function useDebounce(value, delay) {

  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
     
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] 
  );
  return debouncedValue;
}