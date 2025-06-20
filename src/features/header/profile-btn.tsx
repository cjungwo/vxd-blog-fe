// components
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface Props {
   className?: string;
}

export const ProfileBtn = (props: Props) => {
   return <div className={clsx(props.className)}>
      <button>
        <Link href="/profile">
          <Image src="/file.svg" alt="User Avatar Image" width={16} height={16} className="rounded-full" />
        </Link>
      </button>
   </div>;
};