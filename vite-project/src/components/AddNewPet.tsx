import {useState} from "react";
import type {Pet} from "../Pet";
import {useNavigate} from "react-router-dom";

export function AddNewPet() {
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_BASE_URL;

    const [form, setForm] = useState<Omit<Pet, "id" | "sold">>({
        name: "",
        breed: "",
        imgurl: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch(`${API}/CreatePet`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`${res.status} ${res.statusText} – ${text}`);
            }

            navigate("/");
        } catch (err: any) {
            setError(err.message ?? "Failed to create pet");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md space-y-5"
            >
                <h1 className="text-2xl font-bold text-center">Add New Pet</h1>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
                        Breed
                    </label>
                    <input
                        id="breed"
                        name="breed"
                        value={form.breed}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="imgurl" className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        id="imgurl"
                        name="imgurl"
                        value={form.imgurl}
                        onChange={handleChange}
                        required
                        placeholder="https://example.com/pet.jpg"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Paste a direct image URL. (The API expects a string, not a file upload.)
                    </p>
                </div>

                {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                    {submitting ? "Saving..." : "Save Pet"}
                </button>
            </form>
        </div>
    );
}
