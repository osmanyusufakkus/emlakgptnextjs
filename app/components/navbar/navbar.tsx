"use client"
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { usePathname } from 'next/navigation'
const Navbar = () => {
  const pathname = usePathname()
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0">
            <Logo />
            {pathname !== "/api/searching" && <Search />}
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};
export default Navbar;
