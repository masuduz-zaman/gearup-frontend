"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { User, Camera } from "lucide-react";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    // পরে Cloudinary/ImageBB upload করলে এখানে URL সেট করবে
    setFormData({
      ...formData,
      photo: imageUrl,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await authService.register(formData);

      if (res.success) {
        toast.success("Account created successfully!");

        Cookies.set("token", res.data.accessToken, {
          expires: 7,
        });

        Cookies.set("role", res.data.user.role, {
          expires: 7,
        });

        router.push(`/dashboard/${res.data.user.role}`);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Registration failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 py-10 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Create GearUp Account
        </h1>

        {/* Profile Photo */}
        <div className="mt-8 flex justify-center">
          <div className="relative">

            <div className="w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">

              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User
                  size={60}
                  className="text-gray-500 dark:text-gray-300"
                />
              )}
            </div>

            <label
              htmlFor="photo"
              className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer text-white shadow-lg"
              
            >
              <Camera size={18} />
            </label>

            <input
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <p className="text-center mt-2 text-xs text-gray-500 dark:text-gray-400">
          Profile picture 
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Full Name
            </label>

            <input
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email Address
            </label>

            <input
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>

            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}