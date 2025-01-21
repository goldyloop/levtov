import { createSlice } from "@reduxjs/toolkit";

const initValue = {
    userPosition: "מנהל"
};

// פונקציה לשמירה ב-localStorage
const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('userState', serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
};

// פונקציה לטעינת ה-state מ-localStorage
const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('userState');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (e) {
        return undefined;
    }
};



const userSlice = createSlice({
    name: "currentUser",
    initialState: loadStateFromLocalStorage()||initValue,
    reducers: {
        setUserPosition(state, action) {
            state.userPosition = action.payload;
            saveStateToLocalStorage(state);
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
