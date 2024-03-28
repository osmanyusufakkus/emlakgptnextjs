"use client";
export default function Loading() {
  return (
    <div className="h-[calc(100vh-240px)] flex justify-center items-center">
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-cyan-500 animate-spin absolute"></div>
    </div>
  );
}
