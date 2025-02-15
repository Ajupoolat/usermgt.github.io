import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const tokenadmin=localStorage.getItem('tokenAdmin')||null;


const initialState={

    tokenadmin,
    error:null

}


export const adminLogin =createAsyncThunk(
    'auth/adminlogin',
    async(credentials,{rejectWithValue})=>{

        try {
            const response = await axios.post('http://localhost:4000/api/admindata/adminlogin',credentials);
            localStorage.setItem('tokenAdmin',response.data.tokenadmin)
            return response.data
        } catch (error) {
            console.log(error)
           return  rejectWithValue(error.response?.data?.message)
        }
    }
)

const adminAuth=createSlice({
    name:'adminAuth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(adminLogin.pending,(state)=>{

            state.error=null
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{

            state.tokenadmin=action.payload;
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.error=action.payload;
        })
    }
})

export default adminAuth.reducer;