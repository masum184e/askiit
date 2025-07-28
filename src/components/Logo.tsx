import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="text-2xl font-bold text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase bitcount-single">
        AskIIT
      </h1>
    </Link>
  );
};

export default Logo;
