import { createSlice } from "@reduxjs/toolkit";

// const initValue = {
//     phonePosition: "000"
// };

const phoneSlice = createSlice({
    name: "currentPhone",
    initialState: {
        phonePosition: "000",
    },
    reducers: {
        setPhonePosition(state, action) {
            state.phonePosition = action.payload;
        },
    },
});
export const { setPhonePosition } = phoneSlice.actions;
export default phoneSlice.reducer;
  