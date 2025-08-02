import Link from "next/link";

type LogoProps = {
  color?: string;
};

const Logo = ({ color }: LogoProps) => {
  return (
    <Link href="/">
      <h1 className={`text-2xl font-bold ${color?color:'text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'} uppercase bitcount-single`}>
        AskIIT
      </h1>
    </Link>
  );
};

export default Logo;