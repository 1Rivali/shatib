import {
  acImg01,
  bathroomImg01,
  decorsImg01,
  doorsImg01,
  edoorsImg01,
  gypsumImg01,
  insulationImg01,
  nwafezImg01,
  paintsImg01,
  panelsImg01,
  parkehImg01,
  porsalenImg01,
  rkahmImg01,
  siramikImg01,
  stoneImg01,
  switchesImg01,
} from "../..";

export function categoryImage(id: number) {
  switch (id) {
    case 1:
      return rkahmImg01;
    case 2:
      return porsalenImg01;
    case 3:
      return siramikImg01;
    case 4:
      return parkehImg01;
    case 5:
      return nwafezImg01;
    case 6:
      return decorsImg01;
    case 7:
      return doorsImg01;
    case 8:
      return panelsImg01;
    case 9:
      return gypsumImg01;
    case 10:
      return stoneImg01;
    case 11:
      return paintsImg01;
    case 12:
      return insulationImg01;
    case 13:
      return edoorsImg01;
    case 14:
      return acImg01;
    case 15:
      return switchesImg01;
    case 16:
      return bathroomImg01;
    // case 17:
    //   return <Gypsum />;
    default:
      return rkahmImg01;
  }
}
