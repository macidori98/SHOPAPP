import Product from '../../models/Product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const response = await fetch(
        'https://reactnativeapp-aee30-default-rtdb.firebaseio.com/products.json',
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error('something went wrong');
      }

      const resData = await response.json(); //give us the data
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
          ),
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://reactnativeapp-aee30-default-rtdb.firebaseio.com/products/${productId}.json?auth=${
        getState().auth.token
      }`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('something went wrong');
    }

    dispatch({type: DELETE_PRODUCT, pid: productId});
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://reactnativeapp-aee30-default-rtdb.firebaseio.com/products.json?auth=${
        getState().auth.token
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      },
    );

    const resData = await response.json(); //give us the data

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    console.log(getState());
    try {
      const response = await fetch(
        `https://reactnativeapp-aee30-default-rtdb.firebaseio.com/products/${id}.json?auth=${
          getState().auth.token
        }`,
        {
          method: 'PATCH', // it will update where i tell to update it!
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            title,
            description,
            imageUrl,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('something went wrong');
      }

      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
          title: title,
          description: description,
          imageUrl: imageUrl,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};
