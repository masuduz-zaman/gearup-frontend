import Image from "next/image";
import Link from "next/link";
import { GearItem } from "@/types/gear";

export default function GearCard({ gear }: { gear: GearItem }) {
  return (
    <div className="group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Image Container */}
        <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <Image
            src={gear.imageUrl || "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600"}
            alt={gear.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-xs font-semibold text-gray-800 dark:text-gray-200">
            {gear.category?.name || "General"}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition">
            {gear.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {gear.description}
          </p>
        </div>
      </div>

      {/* Footer Details */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-50 dark:border-gray-700/40">
        <div>
          <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
            ${gear.pricePerDay}
          </span>
          <span className="text-xs text-gray-400"> / day</span>
        </div>

        <Link
          href={`/gear/${gear.id}`}
          className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold transition"
        >
          Rent Now
        </Link>
      </div>
    </div>
  );
}