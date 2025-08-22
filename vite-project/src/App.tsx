import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import PetDetails from "./components/PetDetails";
import PetGrid from "./components/PetGrid.tsx";
import {AddNewPet} from "./components/AddNewPet.jsx";

function HomePage() {
    const navigate = useNavigate();

   return <PetGrid />;

}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pet/:petId" element={<PetDetails/>} />
                <Route path="/add-pet" element={<AddNewPet/>} />
            </Routes>
        </BrowserRouter>
    );
}
