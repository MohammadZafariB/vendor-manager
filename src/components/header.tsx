import React, { useState } from "react";
import LogoutButton from "./LogoutButton.tsx";
import UserProfile from "./UserProfile.tsx";
import ThemeToggleButton from "./ThemeToggleButton.tsx";
import { HiMenu, HiX } from "react-icons/hi";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <header className="bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white shadow p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Vendor Manager</h1>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggleButton /> {/* 👈 جایگزین دکمه قدیمی */}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {onSearch && (
            <input
              type="text"
              placeholder="جستجو بر اساس نام برند..."
              value={searchQuery}
              onChange={handleChange}
              className="p-2 rounded w-64 text-black dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
            />
          )}

          <ThemeToggleButton />
          <UserProfile />
          <LogoutButton />
        </div>
      </div>

      {/* 🔹 منوی موبایل */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden">
          {onSearch && (
            <input
              type="text"
              placeholder="جستجو بر اساس نام برند..."
              value={searchQuery}
              onChange={handleChange}
              className="p-2 rounded w-full text-black dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
            />
          )}
          <UserProfile />
          <LogoutButton />
        </div>
      )}
    </header>
  );
}
