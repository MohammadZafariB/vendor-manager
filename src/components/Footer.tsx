// src/components/Footer.tsx
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Vendor Manager. All rights reserved.
        </p>

        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-700"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500"
          >
            <FaTwitter size={20} />
          </a>
          {/* ایمیل شما */}
          <a
            href="mailto:my.mohammad.zafari@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline ml-4"
          >
            my.mohammad.zafari@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
