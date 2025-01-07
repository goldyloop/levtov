import { createSlice } from "@reduxjs/toolkit";

const initValue = {
    userPosition: "מנהל"
};


const userSlice = createSlice({
    name: "currentUser",
    initialState: initValue,
    reducers: {
        setUserPosition(state, action) {
            state.userPosition = action.payload;
        },
    },
});

export const { setUserPosition } = userSlice.actions;
export default userSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initValue={
//     userPosition: "מנהל"
// };

// const userSlice=createSlice({
//     name: "currentUser",
//     initialState: initValue,
//     reducers: {
//         setUserPosition(state, action) {
//             state.userPosition = action.payload;
//         },
//     },

// })
// export const { setUserPosition } = userSlice.actions;
// export default userSlice.reducer;
