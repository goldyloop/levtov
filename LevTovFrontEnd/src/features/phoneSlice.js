
import { createSlice } from "@reduxjs/toolkit";

const initValue = {
    phonePosition: "000"
};

// פונקציה לשמירה ב-localStorage
const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('phoneState', serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
};

// פונקציה לטעינת ה-state מ-localStorage
const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('phoneState');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (e) {
        return undefined;
    }
};

const phoneSlice = createSlice({
    name: "currentPhone",
    initialState: loadStateFromLocalStorage() || initValue, // טען את ה-state מה-localStorage
    reducers: {
        setPhonePosition(state, action) {
            state.phonePosition = action.payload;
            saveStateToLocalStorage(state); // שמור את ה-state ב-localStorage
        },
    },
});

export const { setPhonePosition } = phoneSlice.actions;
export default phoneSlice.reducer;

