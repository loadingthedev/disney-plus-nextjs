import { useRouter } from "next/router";
import { getSession, signIn, signOut, useSession } from "next-auth/client";
import Image from "next/image";
import {
  HomeIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
} from "@heroicons/react/solid";

const Header = () => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <header className="sticky top-0 bg-[#040714] h-[72px] flex z-[999]  items-center px-10 md:px-12">
      <Image
        src="/images/logo.svg"
        width={80}
        height={80}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />

      {session && (
        <div className="hidden ml-10 md:flex items-center space-x-6">
          <a className="header-link group">
            <HomeIcon className="h-4" />
            <span className="span">Home</span>
          </a>
          <a className="header-link group">
            <SearchIcon className="h-4" />
            <span className="span">Search</span>
          </a>
          <a className="header-link group">
            <PlusIcon className="h-4" />
            <span className="span">WatchList</span>
          </a>
          <a className="header-link group">
            <StarIcon className="h-4" />
            <span className="span">Originals</span>
          </a>
          <a className="header-link group">
            <img src="/images/movie-icon.svg" alt="" className="h-5" />
            <span className="span">Movies</span>
          </a>
          <a className="header-link group">
            <img src="/images/series-icon.svg" alt="" className="h-5" />
            <span className="span">Series</span>
          </a>
        </div>
      )}

      {!session ? (
        <button
          className="ml-auto uppercase py-1.5 rounded font-medium px-4 border tracking-wide hover:bg-white hover:text-black transition duration-200"
          onClick={() => signIn("google")}
        >
          Login
        </button>
      ) : (
        <img
          src={session.user.image}
          alt={session.user.name}
          className="rounded-full ml-auto h-12 w-12 object-cover cursor-pointer"
          onClick={signOut}
        />
      )}
    </header>
  );
};

export default Header;
