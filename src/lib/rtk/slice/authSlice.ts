import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

interface AuthState {
    token: string | null
}

const initialState: AuthState = {
    token: getCookie('token') ?? null
}
// 1 slice bao gồm: name đồng thời cũng là type action luôn, initial state: giá trị state hiện tại, reducer: là các action sẽ thay đổi state
const authSliceReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // nhận vào các function, các function có 2 tham số là state, và action, action có 2 props là payload và type
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            if (action.payload) {
                setCookie('token', action.payload);
            } else {
                deleteCookie('authToken');
            }
        },
    }
})
// export action ra 
export const { setToken } = authSliceReducer.actions;
// đồng thời export reducer
export default authSliceReducer.reducer;