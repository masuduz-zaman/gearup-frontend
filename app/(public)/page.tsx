import Navbar from "@/components/shared/Navbar";
import Banner from "@/components/home/Banner";
import GearCard from "@/components/gear/GearCard";
import Footer from "@/components/shared/Footer";
import { GearItem } from "@/types/gear";

async function getFeaturedGear(): Promise<GearItem[]> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL || "http://localhost:5000"}/api/gear`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data?.slice(0, 4) || []; 
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredGear = await getFeaturedGear();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col justify-between">
      <div>
        <Navbar />
        <Banner />

        {/* Featured Gear Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Featured Gear
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Top rated equipment ready for your next adventure
              </p>
            </div>
          </div>

          {/* Gear Cards Grid */}
          {featuredGear.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredGear.map((gear) => (
                <GearCard key={gear.id} gear={gear} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No gear items found at the moment.</p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}