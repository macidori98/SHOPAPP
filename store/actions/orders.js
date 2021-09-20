import Order from '../../models/Order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date = new Date().toISOString();
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://reactnativeapp-aee30-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('error add order');
    }

    const resData = await response.json(); //give us the data

    dispatch({
      type: ADD_ORDER,
      orderData: {
        items: cartItems,
        amount: totalAmount,
        id: resData.name,
        date: date,
      },
    });
  };
};

export const setOrders = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const response = await fetch(
        `https://reactnativeapp-aee30-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error('something went wrong');
      }

      const resData = await response.json(); //give us the data
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date),
          ),
        );
      }

      dispatch({type: SET_ORDERS, orders: loadedOrders});
    } catch (error) {
      throw error;
    }
  };
};
