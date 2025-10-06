import {createBrowserRouter} from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import Home from "../pages/Home"
import InfoPage from "../pages/InfoPage"
import MainHome from '../pages/MainHome'
import CreateEvent from '../features/CreateEvent'
import EnrollParticipant from '../features/EnrollParticipant'
import ErrorBoundary from '../pages/ErroryBoundary'


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
                element: <ErrorBoundary />
            }
        ]
}
])