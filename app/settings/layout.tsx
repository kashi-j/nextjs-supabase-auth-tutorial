"use client";

import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftStartOnRectangleIcon,
  // ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";

const subNavigation = [
  {
    name: "プロフィール",
    icon: UserCircleIcon,
    href: "/settings/profile",
  },
  {
    name: "メールアドレス",
    icon: EnvelopeIcon,
    href: "/settings/email",
  },
  {
    name: "パスワード",
    icon: KeyIcon,
    href: "/settings/password",
  },
  {
    name: "ログアウト",
    icon: ArrowLeftStartOnRectangleIcon,
    href: "/settings/logout",
  },
];

const SetttingLayout = ({ children }: { children: React.ReactNode }) => {
  // usePathnameで現在表示しているパスを取得
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-1 text-sm space-y-1 font-bold flex flex-col">
        {subNavigation.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`${
                item.href == pathname && "bg-sky-100 text-sky-500"
              } hover:bg-sky-100 px-3 py-2 roundede-full`}
            >
              {/* コンポーネントを差し込む */}
              <item.icon className="inline-block w-5 h-5 mr-2" />{item.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="col-span-2">{ children }</div>
    </div>
  );
};

export default SetttingLayout;
