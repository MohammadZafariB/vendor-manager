// src/components/Header.tsx
import React, { useState } from "react";
import LogoutButton from "./LogoutButton.tsx";
import UserProfile from "./UserProfile.tsx";
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
    <header className="bg-gray-800 dark:bg-gray-900 text-white shadow p-4">
      <div className="flex items-center justify-between">
        {/* عنوان */}
        <h1 className="text-xl font-bold">Vendor Manager</h1>

        {/* دکمه همبرگر برای موبایل */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* آیتم‌ها در دسکتاپ */}
        <div className="hidden md:flex items-center gap-4">
          {onSearch && (
            <input
              type="text"
              placeholder="جستجو بر اساس نام برند..."
              value={searchQuery}
              onChange={handleChange}
              className="p-2 rounded w-64 text-black"
            />
          )}
          <UserProfile />
          <LogoutButton />
        </div>
      </div>

      {/* منوی موبایل */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden">
          {onSearch && (
            <input
              type="text"
              placeholder="جستجو بر اساس نام برند..."
              value={searchQuery}
              onChange={handleChange}
              className="p-2 rounded w-full text-black"
            />
          )}
          <UserProfile />
          <LogoutButton />
        </div>
      )}
    </header>
  );
}
