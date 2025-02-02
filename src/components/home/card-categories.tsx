import { ReactNode } from "react";
import { Link } from "react-router";

interface Props {
  icon: ReactNode;
  title: string;
  href: string;
}
export default function CardCategories({ icon, title, href }: Props) {
  return (
    <Link to={href}>
      <div className="card flex-none w-[180px] h-[180px] rounded-sm flex flex-col items-center justify-center border-[#B3B3B3] border-[2px] py-4 hover:bg-[#DB4444] hover:text-white transition-colors ease-linear duration-200 cursor-pointer">
        {icon}
        <p className="mt-4">{title}</p>
      </div>
    </Link>
  );
}
