import { createSlice } from "@reduxjs/toolkit";

const initValue={
    userPosition: "מנהל"
};

const userSlice=createSlice({
    name: "currentUser",
    initialState: initValue,
    reducers: {},

})

export default userSlice.reducer;
