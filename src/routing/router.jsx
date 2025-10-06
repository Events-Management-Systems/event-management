import {createBrowserRouter} from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import Home from "../pages/Home"
import InfoPage from "../pages/InfoPage"
import NotFound from "../pages/NotFound"
import MainHome from '../pages/MainHome'
import CreateEvent from '../features/CreateEvent'
import EnrollParticipant from '../features/EnrollParticipant'


export const router=createBrowserRouter([
{
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <MainHome />
            },

            {
                path: "home",
                element: <MainHome />
            },

            {
                path: "events",
                element: <Home />
            },

            {
                path: "create-event",
                element: <CreateEvent />
            },

            {
                path: "enroll-participant",
                element: <EnrollParticipant />
            },
            {
                path: "info/:id",
                element: <InfoPage />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
}
])