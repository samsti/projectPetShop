import type { Pet } from "../Pet";

export function PetCard({
                            pet,
                            onSelect,
                        }: {
    pet: Pet;
    onSelect?: (id: any) => void | Promise<void>;
}) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden w-full max-w-xs">
            <div className="relative">
                <img src={pet.imgurl} alt={pet.name} className="w-full h-56 object-cover" />
                {pet.sold && (
                    <span className="absolute top-2 left-2 rounded-full bg-black/70 text-white text-xs px-3 py-1">
            Sold
          </span>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-xl font-semibold truncate">{pet.name}</h3>
                <p className="text-sm text-gray-500 mb-3 truncate">{pet.breed}</p>

                <button
                    disabled={!!pet.sold}
                    onClick={() => onSelect?.(pet.id)}
                    className={`w-full px-4 py-2 rounded-xl font-medium transition ${
                        pet.sold
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                    {pet.sold ? "Sold" : "View Details"}
                </button>
            </div>
        </div>
    );
}
