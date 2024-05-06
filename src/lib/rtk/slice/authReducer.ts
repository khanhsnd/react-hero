import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

interface AuthState {
    isAuthenticated: boolean;
    token?: string
}

const initialState: AuthState = {
    isAuthenticated: getCookie('isAuthenticated') ? true : false,
}
// 1 slice bao gồm: name đồng thời cũng là type action luôn, initial state: giá trị state hiện tại, reducer: là các action sẽ thay đổi state
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // nhận vào các function, các function có 2 tham số là state, và action, action có 2 props là payload và type
        login: (state, action) => {
            state.isAuthenticated = true;
            setCookie('isAuthenticated', true);
            setCookie('token', 'kiukiu');
        },
        logout: (state) => {
            state.isAuthenticated = false;
            deleteCookie('isAuthenticated');
            deleteCookie('token');
        },
    }
})
// export 2 action ra 
export const { login, logout } = authSlice.actions;
// đồng thời export reducer
export default authSlice.reducer;