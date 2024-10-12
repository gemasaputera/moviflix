// Header.tsx
'use client';

import React, { useState } from 'react';
import { Bell, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import dynamic from 'next/dynamic';

const ClientSideSearchBar = dynamic(() => import('./SearchBarClient'), {
  ssr: false
});

interface LinkMenu {
  url: string;
  title: string;
}

const menus: LinkMenu[] = [
  { title: 'Home', url: '/' },
  { title: 'TV Shows', url: '/search?term=tvshow' },
  { title: 'Movies', url: '/search?term=movies' },
  { title: 'New & Popular', url: '/search?term=popular' }
];

const LinkMenu: React.FC<LinkMenu> = ({ url, title }) => {
  return (
    <li>
      <Link href={url} className="hover:text-gray-300">
        {title}
      </Link>
    </li>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-black sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <Link href={'/'}>
          <h1 className="text-2xl font-bold text-red-600">Moviflix</h1>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {menus.map((menu) => (
              <LinkMenu key={menu.title} {...menu} />
            ))}
          </ul>
        </nav>
      </div>
      <div className="hidden md:flex items-center justify-center space-x-4">
        <ClientSideSearchBar />
        <Bell className="text-gray-400 hover:text-white cursor-pointer" />
        <User className="text-gray-400 hover:text-white cursor-pointer" />
      </div>
      <div className="md:hidden flex items-center">
        <Button onClick={toggleMenu} variant={'ghost'}>
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </Button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden left-0 top-16 right-0 bg-black absolute z-[99]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menus.map((menu) => (
              <Link
                key={menu.title}
                href={menu.url}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                {menu.title}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <ClientSideSearchBar />
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 w-full">
                <Bell className="mr-3 h-6 w-6" />
                Notifications
              </button>
              <button className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 w-full">
                <User className="mr-3 h-6 w-6" />
                Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
