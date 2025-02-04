import { CheckoutSlice, CreateCheckout } from "@/type/checkout";
import { fetchFunction } from "@/utils/useFetchFunction";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState: CheckoutSlice = {
  isLoading: false,
  error: null,
};
export const createCheckout = createAsyncThunk(
  "create/checkout",
  async (option: CreateCheckout) => {
    try {
      const { lectureId, payment_assetUrl, total_price, onSuccess } = option;
      const { response, data } = await fetchFunction({
        url: "purchases",
        method: "POST",
        body: JSON.stringify({
          lectureId,
          payment_assetUrl,
          total_price,
        }),
      });
      if (!response.ok) {
        data.message && toast.error(data.message);
      } else {
        onSuccess && onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const checkoutSlice = createSlice({
  name: "checkoutSlice",
  initialState,
  reducers: {},
});
