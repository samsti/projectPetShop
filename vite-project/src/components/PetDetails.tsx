import {useParams, useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {AllPetsAtom} from "../AllPets";
import type {Pet} from "../Pet";
import trashIcon from "../assets/trash-3.png"

export default function PetDetails() {
    const {petId} = useParams<{ petId: string }>();
    const [allPets] = useAtom<Pet[]>(AllPetsAtom);
    const navigate = useNavigate();
    const {id} = useParams();
    const API = import.meta.env.VITE_API_BASE_URL;


    const pet = allPets.find((p) => String(p.id) === petId);
    if (!pet)
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-gray-600">Pet not found.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-100 transition"
                    >
                        ← Go Back
                    </button>
                </div>
            </div>
        );

    const isSold = !!pet.sold;

    const handleDelete = async () => {
        if (!confirm(`Delete ${pet.name}?`)) return;

        try {
            const res = await fetch(`${API}/DeletePet?id=${pet.id}`, {method: "DELETE"});
            const data = await res.json().catch(() => null);

            if (!res.ok) {
                alert(data?.title || `Delete failed (${res.status})`);
                return;
            }
            navigate("/");
        } catch {
            alert("Delete failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-5xl mx-auto p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-100 transition"
                >
                    ← Go Back
                </button>

                <div className="bg-white rounded-3xl shadow overflow-hidden grid md:grid-cols-2">
                    <div className="relative">
                        <img
                            src={pet.imgurl}
                            alt={pet.name}
                            className="w-full h-80 md:h-full object-cover"
                        />
                        {isSold && (
                            <span
                                className="absolute top-3 left-3 rounded-full bg-black/70 text-white text-xs px-3 py-1">
                Sold
              </span>
                        )}
                    </div>

                    <div className="p-6 md:p-8 flex flex-col">
                        <div className="mb-4">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-bold">{pet.name}</h1>
                                <button
                                    onClick={handleDelete}
                                    className="px-3 py-3 rounded-xl hover:bg-red-500 text-gray-800 transition bg-red-600"
                                >
                                    <img src={trashIcon} alt="trash" className="w-7"/>
                                </button>
                            </div>
                            <p className="text-gray-500 mt-1">{pet.breed}</p>

                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {"age" in pet && pet.age && (
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500">
                                        Age
                                    </div>
                                    <div className="font-medium">{String((pet as any).age)}</div>
                                </div>
                            )}
                            {"gender" in pet && (pet as any).gender && (
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500">
                                        Gender
                                    </div>
                                    <div className="font-medium">{(pet as any).gender}</div>
                                </div>
                            )}
                            {"color" in pet && (pet as any).color && (
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500">
                                        Color
                                    </div>
                                    <div className="font-medium">{(pet as any).color}</div>
                                </div>
                            )}
                            {"id" in pet && pet.id && (
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500">
                                        ID
                                    </div>
                                    <div className="font-medium">{String(pet.id)}</div>
                                </div>
                            )}
                        </div>

                        {"description" in pet && (pet as any).description && (
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {(pet as any).description}
                            </p>
                        )}

                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => navigate("/")}
                                className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition w-full"
                            >
                                Back to Pets
                            </button>
                            <button
                                onClick={() => navigate(`/edit-pet/${pet.id}`)}
                                className="px-5 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-white transition w-full ml-2"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
