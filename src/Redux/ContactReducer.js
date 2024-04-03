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
        let idx = state.value.findIndex((el)=>{
           if(el.id==action.payload.id){
            return el;
           }
        })
        state.value[idx]=action.payload
        }
    }
})

export const {CreateContact,DeleteContact,EditContact} = ContactSlice.actions