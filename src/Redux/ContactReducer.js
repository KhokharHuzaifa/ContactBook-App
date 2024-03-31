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
        },
        EditContact: (state,action) => {
            // const abc = state.value.filter((i)=>i.id==action.payload.id)
            // console.log(abc);
            // console.log(action);
        }
    }
})

export const {CreateContact,DeleteContact,EditContact} = ContactSlice.actions