import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="text-white text-lg font-bold">YouTube Transcript Tool</a>
          </Link>
          <div>
            <Link href="/about">
              <a className="text-gray-300 hover:text-white mx-2">About</a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-300 hover:text-white mx-2">Contact</a>
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;
