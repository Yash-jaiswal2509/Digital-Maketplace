"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "./use-onclick-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setActiveIndex(null));

  //comparing here which make it boolean
  const isAnyOpen = activeIndex !== null;

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {/* two navitems/components(reason to use react(reusable)) getting returned from here, through map */}
      {PRODUCT_CATEGORIES.map((category, i) => {
        //i is (0,1)
        const handleOpen = () => {
          //initially when activeIndex is null else gets executed
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        //when 1st hanldeOpen gets executed isOpen becomes true
        const isOpen = i === activeIndex;
        //comparing here
        return (
          <NavItem
            category={category}
            //you can say it is attached with both navitem, through button
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
            key={category.value}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
