import { Link } from "react-router";

interface Props {
  name: string;
}
export default function CardCategories({ name }: Props) {
  return (
    <Link to={`/products?category=${name}`}>
      <div className="card flex-none w-[180px] h-[180px] rounded-sm flex flex-col items-center justify-center border-[#B3B3B3] border-[2px] py-4 hover:bg-[#DB4444] hover:text-white transition-colors ease-linear duration-200 cursor-pointer">
        <p className="px-3 mt-4 text-center capitalize">{name}</p>
      </div>
    </Link>
  );
}
