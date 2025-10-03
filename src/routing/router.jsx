import {createBrowserRouter} from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import Home from "../pages/Home"
import InfoPage from "../pages/InfoPage"
import NotFound from "../pages/NotFound"


export const router=createBrowserRouter([
{
    path:"/",
    element:<MainLayout/> ,
    children:[
        {
            index:true,
            element:<Home/>
        },
        {
            path:"/info/:id",
            element:<InfoPage/>
        },
        {
            path:"/NotFound",
            element:<NotFound/>
        }
    ]
}
])