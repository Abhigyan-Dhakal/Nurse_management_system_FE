import { Nurse } from "../domain/Nurse";

export const sortNurses = (arrData: Array<Nurse>) => {
  let roundingManagers = arrData.filter((item: Nurse) => {
    return item.isRoundingManager === true;
  });

  let nonRoundingManagers = arrData.filter((item: Nurse) => {
    return item.isRoundingManager !== true;
  });

  roundingManagers = roundingManagers.sort((objA: Nurse, objB: Nurse) => {
    var nameA = objA.name.toLowerCase(),
      nameB = objB.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  nonRoundingManagers = nonRoundingManagers.sort((objA: Nurse, objB: Nurse) => {
    var nameA = objA.name.toLowerCase(),
      nameB = objB.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const mainArray = roundingManagers.concat(nonRoundingManagers);

  return mainArray;
};
