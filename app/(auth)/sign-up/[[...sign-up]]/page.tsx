"use client"
import { useRouter } from 'next/navigation';
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  const router = useRouter();

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.currentTarget === event.target) {
      router.back();
    }
  }

  return (
    <div onClick={handleClickOutside} className="h-screen w-screen fixed flex justify-center items-center">
      <SignUp />
    </div>
  );
}