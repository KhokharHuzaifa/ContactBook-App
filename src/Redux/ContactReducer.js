import { createSlice } from "@reduxjs/toolkit";

export const ContactSlice = createSlice({
    name:'ContactStore',
    initialState:{
        value:[]
    },
    reducers:{
        CreateContact : (state,action) => {
            state.value.push(action.payload)
        },
        DeleteContact: (state,action) => {
            const filteredItem = state.value.filter((p) => p.id != action.payload);
            state.value = filteredItem
        }
    }
})

export const {CreateContact,DeleteContact} = ContactSlice.actions