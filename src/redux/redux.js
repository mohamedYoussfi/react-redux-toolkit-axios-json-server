import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:9000/products");
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    pending: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id != action.payload.id);
    },

    checkProduct: (state, action) => {
      let product = state.products.find((p) => p.id == action.payload.id);
      product.checked = !product.checked;
    },
    deleteCheckedProducts: (state, action) => {
      state.products = state.products.filter((p) => p.checked == false);
    },
    checkAllProducts: (state, action) => {
      state.products = state.products.map((p) => {
        p.checked = action.payload;
        return p;
      });
    },
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.pending = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.success = true;
      state.pending = false;
    },
    [getProducts.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.success = false;
      state.pending = false;
    },
  },
});

export const {
  loadProducts,
  addProduct,
  deleteProduct,
  checkProduct,
  deleteCheckedProducts,
  checkAllProducts,
} = productsSlice.actions;

export const store = configureStore({
  reducer: {
    productState: productsSlice.reducer,
  },
});
