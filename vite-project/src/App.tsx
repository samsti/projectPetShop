// src/App.tsx
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import type {Pet} from "./Pet.ts";
import  PetDetails from "./components/PetDetails";
import {useAtom} from "jotai";
import {AllPetsAtom} from "./AllPets.tsx";
import PetGrid from "./components/PetGrid.tsx";
import {PetCard} from "./components/PetCard.tsx";

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
            </Routes>
        </BrowserRouter>
    );
}
