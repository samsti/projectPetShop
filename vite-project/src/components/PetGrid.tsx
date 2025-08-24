import {useAtom} from "jotai";
import {AllPetsAtom} from "../AllPets";
import type {Pet} from "../Pet";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {PetCard} from "./PetCard";

export default function PetGrid() {
    const [allPets, setAllPets] = useAtom<Pet[]>(AllPetsAtom);
    const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
        "idle"
    );
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const ac = new AbortController();

        (async () => {
            try {
                setStatus("loading");
                const res = await fetch(`${API}/GetPets`, {
                    signal: ac.signal,
                });
                if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
                const data: Pet[] = await res.json();
                setAllPets(data);
                setStatus("ready");
            } catch (e: any) {
                if (e?.name === "AbortError") return;
                setError(e?.message ?? "Unknown error");
                setStatus("error");
            }
        })();

        return () => ac.abort();
    }, [setAllPets]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Available Pets</h1>
                    <button
                        onClick={() => navigate("/add-pet")}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
                    >
                        + Add New Pet
                    </button>
                </div>


                {status === "loading" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({length: 8}).map((_, i) => (
                            <div
                                key={i}
                                className="w-80 h-72 bg-white rounded-2xl shadow animate-pulse"
                            >
                                <div className="h-44 bg-gray-200 rounded-t-2xl"/>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded"/>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"/>
                                    <div className="h-9 bg-gray-200 rounded-xl"/>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {status === "error" && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl">
                        Failed to load pets. {error && <span>({error})</span>}
                    </div>
                )}

                {status === "ready" && allPets.length === 0 && (
                    <div className="text-center text-gray-600 bg-white rounded-2xl p-10 shadow">
                        No pets available right now
                    </div>
                )}

                {status === "ready" && allPets.length > 0 && (
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                        {allPets.map((pet) => (
                            <PetCard
                                key={pet.id!}
                                pet={pet}
                                onSelect={() => navigate(`/pet/${pet.id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
