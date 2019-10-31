import Item1 from "../../images/big dot.png";
import Item2 from "../../images/cherry.png";
import Item3 from "../../images/City jazz.png";
import Item4 from "../../images/Dice.png";
import Item5 from "../../images/Hamburger.png";
import Item6 from "../../images/flower power.png";
import Item7 from "../../images/hamburger2.png";
import Item8 from "../../images/hamburger3.png";
import Item9 from "../../images/hearts.png";
import Item10 from "../../images/Pool.png";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING
} from "../actions/action-types/cart-actions";
import Auth from "../Auth";
import Logger from "../Logger";

const initState = {
  items: [
    {
      id: 1,
      title: "Big Dot Socks",
      desc: "Dot Dot Dot",
      price: 12,
      img: Item1
    },
    {
      id: 2,
      title: "Cherry Socks",
      desc: "The cherry on top",
      price: 8,
      img: Item2
    },
    {
      id: 3,
      title: "City Jazz Socks",
      desc: "New York's finest",
      price: 11,
      img: Item3
    },
    {
      id: 4,
      title: "Dice Socks",
      desc: "Roll your legs in the bed like a pair of dices",
      price: 22,
      img: Item4
    },
    {
      id: 5,
      title: "Hamburger Socks",
      desc: "Yum!",
      price: 16,
      img: Item5
    },
    {
      id: 6,
      title: "Flower Power Socks",
      desc: "Editor's choice",
      price: 9,
      img: Item6
    },
    {
      id: 7,
      title: "Hamburger Socks",
      desc: "Our very own specialty",
      price: 10,
      img: Item7
    },
    {
      id: 8,
      title: "Yet Another Hamburger Socks",
      desc: "Yap",
      price: 11,
      img: Item8
    },
    {
      id: 9,
      title: "Hearts Socks",
      desc: "Have a warm and cozy night with your loved ones",
      price: 9,
      img: Item9
    },
    {
      id: 10,
      title: "Pool Socks",
      desc: "Luxury version, imported from France",
      price: 27,
      img: Item10
    }
  ],
  addedItems: [],
  total: 0
};
const cartReducer = (state = initState, action) => {
  var currentUser = Auth.getCurrentUser();

  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find(item => item.id === action.id);
    Logger.log(currentUser + ": added item " + addedItem.title + " to cart");
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(item => action.id === item.id);
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.price;

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find(item => action.id === item.id);
    Logger.log(
      currentUser + ": removed item " + itemToRemove.title + " from cart"
    );
    let new_items = state.addedItems.filter(item => action.id !== item.id);

    //calculating the total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    console.log(itemToRemove);
    return {
      ...state,
      addedItems: new_items,
      total: newTotal
    };
  }
  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find(item => item.id === action.id);
    Logger.log(currentUser + ": added quantity of " + addedItem.title);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find(item => item.id === action.id);
    Logger.log(currentUser + ": substracted quantity of " + addedItem.title);
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter(item => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal
      };
    }
  }

  if (action.type === ADD_SHIPPING) {
    Logger.log(currentUser + ": added shipping");
    return {
      ...state,
      total: state.total + 6
    };
  }

  if (action.type === "SUB_SHIPPING") {
    Logger.log(currentUser + ": substracted shipping");
    return {
      ...state,
      total: state.total - 6
    };
  } else {
    return state;
  }
};

export default cartReducer;
