'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const isAdmin = session?.user?.role === 'admin';

  return (
    <nav className="bg-[#fcb9b1] p-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <Link href="/" className="flex items-center" onClick={closeNavbar}>
            <Image src="/logo192.png" alt="Logo" width={32} height={32} className="mr-3" />
            <span className="self-center text-l text-black whitespace-nowrap">Community Connect</span>
          </Link>
          <button
            onClick={toggleNavbar}
            className="inline-flex items-center p-2 ml-3 text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
          <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
              <li>
                <Link href="/" className="block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:p-0" onClick={closeNavbar}>Home</Link>
              </li>
              {status === 'authenticated' ? (
                <>
                  {!isAdmin && (
                    <>
                      <li>
                        <Link href="/about" className="block py-2 pr-4 pl-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" onClick={closeNavbar}>About</Link>
                      </li>
                      <li>
                        <Link href="/contact" className="block py-2 pr-4 pl-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" onClick={closeNavbar}>Contact</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link href="/profile" className="block py-2 pr-4 pl-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" onClick={closeNavbar}>Profile</Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link href="/admin" className="block py-2 pr-4 pl-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" onClick={closeNavbar}>Admin</Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        signOut();
                        closeNavbar();
                      }}
                      className="block py-2 pr-4 pl-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/about" className="block py-2 pr-4 pl-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" onClick={closeNavbar}>About</Link>
                  </li>
                  <li>
                    <Link href="/contact" className="block py-2 pr-4 pl-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" onClick={closeNavbar}>Contact</Link>
                  </li>
                  <li>
                    <Link href="/auth/signin" className="block py-2 pr-4 pl-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" onClick={closeNavbar}>Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}