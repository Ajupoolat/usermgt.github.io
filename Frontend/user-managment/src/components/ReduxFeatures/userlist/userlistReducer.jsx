import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//initailization

const initialState={

    userlist:[],
    loading:false,
    error:null,
    update:false,
    newuser:false,
    searchdata:false,
}

//fetching user data 

 export const userData = createAsyncThunk(   'userlist/datafetching',
    async(_,{rejectWithValue})=>{

        try {
            const response= await axios.get('http://localhost:4000/api/admindata/getuserdata');
            // console.log("API Data:", JSON.stringify(response.data, null, 2));
            return response.data
        } catch (error) {
            console.log(error)
          return  rejectWithValue(error.response?.data?.message) 
           

        }
    })
    export const deleteUser=createAsyncThunk('userdelete/datadeleting',
        async(userId,{rejectWithValue})=>{
            console.log("userid"+userId)
            try {
                    await axios.delete(`http://localhost:4000/api/admindata/deleteuser/${userId}`)
                    return userId
            } catch (error) {
                
                rejectWithValue(error.response?.data?.message)
            }
        }
    )

//edituser
    export const editUser = createAsyncThunk(
        'userlist/editUser',
        async ({userId,updatedData}, { rejectWithValue }) => {
          try {
            console.log("userId"+userId)
            const response = await axios.patch(
              `http://localhost:4000/api/admindata/edituser/${userId}`,
              updatedData
            );
            console.log("userid:"+userId)
            return response.data;
            console.log(response.data)
            // Assuming backend returns updated user data
          } catch (error) {
            return rejectWithValue(error.response?.data?.message);
          }
        }
      );
      
  //adduser

  export const addnewuser=createAsyncThunk(
    'userlist/adduser',
    async({formdata},{rejectWithvalue})=>{
     console.log(formdata)
      try {
        
      const response= await axios.post(  `http://localhost:4000/api/admindata/adduser`,formdata)
      return response.data
      console.log(response)

      } catch (error) {
         
        console.log(error);

        return rejectWithvalue(error.response?.data?.message)
      }
    }
  )

//search user

export const search=createAsyncThunk(
  'search/user',
  async({query},{rejectwithvalue})=>{
     
    console.log(query)
    try {
      const response =await axios.get(`http://localhost:4000/api/admindata/searchuser?query=${query}`)
      console.log("searched data ",response.data)

      return response.data.users
    } catch (error) {
      console.log(error)

      return rejectwithvalue(error.response?.data?.message)
    }
  }
)

const userlisted=createSlice({
    name:'userdata',
   initialState,
    reducers:{
       setUsers:(state,action)=>{
        state.userlist=action.payload
       },
    },
    //user listing
    extraReducers:(builder)=>{
        builder.addCase(userData.pending,(state)=>{
          state.loading=true
        })
        .addCase(userData.fulfilled,(state,action)=>{
            console.log('data rece'+action.payload)
            state.userlist=action.payload
        })
        .addCase(userData.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })

        //delete the user
        .addCase(deleteUser.pending,(state)=>{
           
            state.loading=true;
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.userlist = state.userlist.filter((user) => user._id !== action.payload);


        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.error=action.payload
        })
        //edituser
        .addCase(editUser.pending, (state) => {
            state.loading = true;
            state.update=false;
            
          })
          .addCase(editUser.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.userlist.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
              state.userlist[index] = action.payload; 
            }
          state.update=!
          state.update

          })
          .addCase(editUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.update=false
          })
          //adduser
          .addCase(addnewuser.pending,(state)=>{
            state.loading=true;
            state.newuser=false;
            state.error=null;
          })
          .addCase(addnewuser.fulfilled,(state,action)=>{
            state.loading=false;
            state.userlist=action.payload;
            state.newuser=!state.newuser;
          })
          .addCase(addnewuser.rejected,(state,action)=>{
                      
            state.error=action.payload;
          
          })
          //user searching 
          .addCase(search.pending,(state)=>{
            state.loading=true
          })
          .addCase(search.fulfilled,(state,action)=>{
            state.loading=false;
            state.searchdata=!state.searchdata;
            state.userlist=action.payload;
            console.log(action.payload,"searched data")
          })
          .addCase(search.rejected,(state,action)=>{
            state.error=action.payload.users;
          })


    }

})

export const {setUser}=userlisted.actions;
export default userlisted.reducer;