import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { setUser } from '../userlist/userlistReducer';

const token=localStorage.getItem('token')||null;
//define the state
const initialState={
token,
loading:false,
error:null,
message:null,
data:{},
isdatareached:false,
edited:false
};

export const login=createAsyncThunk(
    'auth/login',
    async(credentials,{rejectWithValue})=>{

        try {
            const response= await axios.post('http://localhost:4000/api/data/login',credentials);
            console.log(response.data.message)
            localStorage.setItem('token',response.data.token)
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.message||'login field')
        }
    }
)

export const fetchdata=createAsyncThunk(
    'fetchdatahome/data',
      async(tokensender,{rejectWithValue})=>{
        console.log('FETCHDATA:'+token)

        try {
            const response = await axios.get('http://localhost:4000/api/data/profileicon',{
                 
                headers:{
                    Authorization:`Bearer ${tokensender}`,
                    'Content-Type': 'application/json'
                  }
                })
                return response.data

            } catch (error) {
            rejectWithValue(error?.response?.data?.message)
        }
      }
)


export const edit=createAsyncThunk(
    'edit/userdata',
    async({userId,formdata},{rejectWithValue})=>{
        console.log(userId)
        console.log(formdata.profilePicture+': PROFILE')

        try {

            const formData = new FormData();

      formData.append("email", formdata.email);
      formData.append("password", formdata.password);

      if (formdata.profilePicture) {
        formData.append("profilePicture", formdata.profilePicture);
      }
      
            const response = await axios.patch(`http://localhost:4000/api/data/edit/${userId}`,formdata,
                {
                    headers: { "Content-Type": "multipart/form-data" }

                }
            )
            console.log("PATCH :"+response.data)
            return response.data
        } catch (error) {
            console.log(error)
            rejectWithValue(error.response?.data?.mesage)
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
    reducers:{
       
    },
    extraReducers:(builder)=>{

        builder.addCase(login.pending,(state)=>{

            state.loading=true;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            
            state.loading=false;
            state.token=action.payload.token;
            state.error=null;
            console.log(state)

        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(logout.fulfilled,(state)=>{

            state.token=null;
        })
        //fetching data 

        .addCase(fetchdata.pending,(state)=>{
                     
         state.isdatareached=false
           

        })
        .addCase(fetchdata.fulfilled,(state,action)=>{

            state.data=action.payload;
            state.isdatareached=!state.isdatareached
             

        })
        .addCase(fetchdata.rejected,(state,action)=>{
            state.data=false;
        })
        //editing
        .addCase(edit.pending,(state)=>{
            state.edited=false
        })
        .addCase(edit.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.edited=true;
        })
        .addCase(edit.rejected,(state,action)=>{
            state.edited=false;
        })
    }

})

export default authslice.reducer;
