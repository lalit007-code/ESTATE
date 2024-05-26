import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
const Home = lazy(() => import("./pages/Home.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const CreateListing = lazy(() => import("./pages/CreateListing.jsx"));
const UpdateListing = lazy(() => import("./pages/UpdateListing.jsx"));
const Listing = lazy(() => import("./pages/Listing.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/search" element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
