import Product from '../../models/Product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    try {
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
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
          ),
        );
      }

      dispatch({type: SET_PRODUCTS, products: loadedProducts});
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    const response = await fetch(
      `https://reactnativeapp-aee30-default-rtdb.firebaseio.com/products/${productId}.json`,
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
  return async dispatch => {
    const response = await fetch(
      'https://reactnativeapp-aee30-default-rtdb.firebaseio.com/products.json',
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
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://reactnativeapp-aee30-default-rtdb.firebaseio.com/products/${id}.json/`,
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
