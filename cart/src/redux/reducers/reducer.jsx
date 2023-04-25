const INIT_STATE = {
  carts: [],
};

export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      // This will add the new item to the cart that will not remove the previous item from the cart that's y we use the spread operator
      // return {
      //   ...state,
      //   carts: [...state.carts, action.payload],
      // };

      // In this we increment the qnty and by adding the items in the carts

      // Agr item ka index and jo item add kiye hai uska index same ho tab hi add increment karna hai
      const ItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (ItemIndex >= 0) {
        state.carts[ItemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        // Same as above commented return
        return {
          ...state,
          carts: [...state.carts, temp],
        };
      }

    case "RMV_CART":
      const data = state.carts.filter((el) => el.id !== action.payload);

      return {
        ...state,
        carts: data,
      };

    case "RMV_ONE":
      const ItemIndex_dec = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.carts[ItemIndex_dec].qnty >= 1) {
        const dltitem = (state.carts[ItemIndex_dec].qnty -= 1);
        console.log([...state.carts, dltitem]);

        return {
          ...state,
          carts: [...state.carts],
        };
        // Remove the item if qnty is 0
      } else if (state.carts[ItemIndex_dec].qnty === 1) {
        const data = state.carts.filter((el) => el.id !== action.payload);

        return {
          ...state,
          carts: data,
        };
      }

    default:
      return state;
  }
};
