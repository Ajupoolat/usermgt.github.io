import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const token=localStorage.getItem('token')||null;
//define the state
const initialState={
token,
loading:false,
error:null
};

export const login=createAsyncThunk(
    'auth/login',
    async(credentials,{rejectwithvalue})=>{

        try {
            const response= await axios.post('http://localhost:4000/api/data/login',credentials);
            localStorage.setItem('token',response.data.token)
            return response.data.token;
        } catch (error) {
            
            return rejectwithvalue(error.response?.data?.message||'login field')
        }
    }
)

export const logout=createAsyncThunk('auth/logoutUser',async()=>{
  
    localStorage.removeItem('token');
    return null;
})


const authslice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        builder.addCase(login.pending,(state)=>{

            state.loading=true;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            
            state.loading=false;
            state.token=action.payload

        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(logout.fulfilled,(state)=>{

            state.token=null;
        })
    }

})

export default authslice.reducer;
