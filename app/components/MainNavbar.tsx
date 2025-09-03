import Link from 'next/link';

type SelectedKey = 'Home' | 'Articles' | 'Contact';

interface MainNavbarProps {
  selected?: SelectedKey;
}

export default function MainNavbar({ selected }: MainNavbarProps) {
  const baseLink =
    "underline underline-offset-4 px-2 text-[#2C3E50] hover:text-[#4A90E2] transition-colors duration-200";
  const active = "text-[#4A90E2]";

  return (
    <nav className="px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <div
          className="flex justify-center space-x-4 sm:space-x-6 md:space-x-10 lg:space-x-12 text-base sm:text-lg md:text-xl font-semibold"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          <Link
            href="/"
            className={`${baseLink} ${selected === 'Home' ? active : ''}`}
          >
            Home
          </Link>
          <Link
            href="/articles"
            className={`${baseLink} ${selected === 'Articles' ? active : ''}`}
          >
            Articles
          </Link>
          <Link
            href="/contact"
            className={`${baseLink} ${selected === 'Contact' ? active : ''}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
