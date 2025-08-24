import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import PetDetails from "./components/PetDetails";
import PetGrid from "./components/PetGrid.tsx";
import {AddNewPet} from "./components/AddNewPet.jsx";
import {EditPet} from "./components/EditPet.tsx";

function HomePage() {
    return <PetGrid/>;

}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/pet/:petId" element={<PetDetails/>}/>
                <Route path="/add-pet" element={<AddNewPet/>}/>
                <Route path="/edit-pet/:petId" element={<EditPet/>}/>
            </Routes>
        </BrowserRouter>
    );
}
