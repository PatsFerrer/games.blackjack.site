'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ListPathPages() {

  const currentPath = usePathname();

  const pages = [
    { name: 'Início', path: '/home' },
    { name: 'Criar Sala', path: '/criar-sala' },
  ];

  const isActive = (path: string) => {
    return currentPath === path;
  }

  return (
    // menu 'início' e 'criar sala'
    <div className="items-center justify-between hidden w-full md:flex md:w-auto" id="navbar-user" >
      <ul className="flex font-medium p-4 md:space-x-8">

        {pages.map((page, index) => (
          <li key={index}>
            <Link
              href={page.path}
              className={`block py-2 px-3 md:p-0 text-white ${isActive(page.path) ? 'active' : ''}`}
              aria-current="page"
            >
              {page.name}
            </Link>
          </li>
        ))}

      </ul>
    </div>

  )
}
