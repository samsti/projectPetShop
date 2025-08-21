import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { AllPetsAtom } from "../AllPets";
import type { Pet } from "../Pet";
import { PetCard } from "./PetCard";

export default function PetDetails() {
    const { petId } = useParams<{ petId: string }>();
    const [allPets] = useAtom<Pet[]>(AllPetsAtom);
    const navigate = useNavigate();

    const pet = allPets.find((p) => String(p.id) === petId);
    if (!pet) return <div className="text-center mt-10">Pet not found.</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-100 transition"
                >
                    ← Go Back
                </button>

                <div className="flex justify-center">
                    {/* Make the detail card bigger than grid cards */}
                    <div className="w-full max-w-xl md:max-w-2xl transform md:scale-110 content-center">
                        <PetCard pet={pet} />
                    </div>
                </div>
            </div>
        </div>
    );
}
