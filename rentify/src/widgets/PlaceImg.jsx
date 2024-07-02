/* eslint-disable react/prop-types */
import api from '../components/apilink.mjs';

export default function PlaceImg({place,index=0,className=null}) {
  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <img className={className} src={api+place.photos[index]} alt=""/>
  );
}