import { Link } from "react-router-dom"
export default function Navbar(){

    return(
    <>
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Event Manager
        </Link>
        <div className="space-x-4">
            <Link to="/home" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/events" className="hover:text-gray-200">
              Events
            </Link>
        </div>
      </div>
    </nav>
    </>
    )
}