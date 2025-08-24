import {useParams, useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {AllPetsAtom} from "../AllPets";
import type {Pet} from "../Pet";
import {useEffect, useState} from "react";

export function EditPet() {
    const {petId} = useParams<{ petId: string }>();
    const [allPets] = useAtom<Pet[]>(AllPetsAtom);
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_BASE_URL;

    const pet = allPets.find((p) => String(p.id) === petId);

    const [form, setForm] = useState({
        id: "",
        name: "",
        breed: "",
        sold: false,
        imgurl: "",
    });

    useEffect(() => {
        if (pet) {
            setForm({
                id: String(pet.id ?? ""),
                name: pet.name ?? "",
                breed: pet.breed ?? "",
                sold: !!pet.sold,
                imgurl: pet.imgurl ?? "",
            });
        }
    }, [pet]);

    if (!pet) {
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
    }

    const handleUpdate = async () => {
        if (!confirm(`Update ${form.name}?`)) return;

        try {
            const res = await fetch(`${API}/UpdatePet`, {
                method: "PUT", // or "PATCH" if your API expects partial updates
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                alert(`Update failed (${res.status})`);
                return;
            }

            navigate("/");
        } catch (e) {
            console.error(e);
            alert("Update failed");
        }
    };

    const isSold = form.sold;

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
                            src={form.imgurl}
                            alt={form.name}
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
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm((prev) => ({...prev, name: e.target.value}))}
                                    className="text-2xl font-semibold w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Breed"
                                value={form.breed}
                                onChange={(e) => setForm((prev) => ({...prev, breed: e.target.value}))}
                                className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <input
                                type="url"
                                placeholder="Image URL"
                                value={form.imgurl}
                                onChange={(e) => setForm((prev) => ({...prev, imgurl: e.target.value}))}
                                className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <label className="mt-3 inline-flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={form.sold}
                                    onChange={(e) => setForm((prev) => ({...prev, sold: e.target.checked}))}
                                />
                                <span>Sold</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleUpdate}
                                className="px-5 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-white transition w-full"
                            >
                                Update
                            </button>
                        </div>

                        <div className="text-xs text-gray-500 mt-3">
                            ID: {form.id}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
