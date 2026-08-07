import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-black text-white">🎒 GearUp</span>
            <p className="mt-3 text-sm text-gray-400">
              The premier platform for renting high-quality outdoor and sports equipment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/gear" className="hover:text-white">All Gear</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Camping & Hiking</li>
              <li>Photography</li>
              <li>Water Sports</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <p className="text-sm text-gray-400">Need help with your rental order?</p>
            <p className="text-sm font-semibold text-blue-400 mt-2">support@gearup.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} GearUp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}