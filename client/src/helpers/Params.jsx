/* eslint-disable react-hooks/rules-of-hooks */
import {useLocation} from 'react-router-dom';

export const paramsLocations = (data) => {
  const {search} = useLocation();
  const params = new URLSearchParams(search);
  const returnData = params.get(data);
  return returnData;
};
