"use client"
import { textStore } from "../../store/textStore";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { usePathname } from 'next/navigation'

export async function HandlePrompt(prompt: any) {
  const result = await performPrismaQuery(prompt);
  console.log("Result:", JSON.stringify(result, null, 2));
  return textStore.getState().updateText(result);
}

async function extractWhereClause(code: any) {
  const regex = /where: {([^;]*)}/g;
  let match;
  const results = [];
  while ((match = regex.exec(code)) !== null) {
    results.push(match[1].trim().slice(0, -2));
  }
  return results;
}

async function performPrismaQuery(code: any) {
  const whereClause = await extractWhereClause(code);
  const whereClauseStr = whereClause[0];
  const whereClauseObj = await eval(`({${whereClauseStr}})`);
  console.log("WhereClauseObj:" + whereClauseObj);
  return whereClauseObj;
}

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
