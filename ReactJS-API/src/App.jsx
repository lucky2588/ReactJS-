import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './not-found/NotFound'
import UserCreate from './user/UserCreate'
import UserDeteil from './user/UserDetail'
import UserList from './user/UserList'



function App() {
    //users
    // users/create
    // users/{id}
    return (
        <>
            <Routes>
                <Route path="/users">
                    <Route index element={<UserList/>}></Route>
                    <Route path="create" element={<UserCreate/>}></Route>
                    <Route path=":userID" element={<UserDeteil/>}></Route>
                </Route>
                <Route path="*" element={<NotFound />}>
                </Route>
            </Routes>
        </>
    )
}

export default App