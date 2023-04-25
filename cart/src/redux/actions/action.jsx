export const ADD = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};

// Remove item
export const DLT = (id) => {
  return {
    type: "RMV_CART",
    payload: id,
  };
};

// remove individual item

export const REMOVE = (item) => {
  return {
    type: "RMV_ONE",
    payload: item,
  };
};
