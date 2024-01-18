'use client'
import { PRODUCT_CATEGORIES } from "@/config"
import { use, useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "./use-onclick-outside"



const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null)

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                return setActiveIndex(null);
            }
        }

        document.addEventListener('keydown', handler)
        return () => {
            document.removeEventListener('keydown', handler)
        }
    }, [])

    const navRef = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(navRef, () => setActiveIndex(null))

    const isAnyOpen = activeIndex !== null
    //comparing here

    return (
        <div className="flex gap-4 h-full" ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, i) => {
                const handleOpen = () => {
                    if (activeIndex === i) {
                        setActiveIndex(null)
                    } else {
                        setActiveIndex(i)
                    }
                }

                const isOpen = i === activeIndex
                //comparing here
                return (
                    <NavItem
                        category={category}
                        handleOpen={handleOpen}
                        isOpen={isOpen}
                        isAnyOpen={isAnyOpen}
                        key={category.value}
                    />
                )
            })}
        </div>
    )
}

export default NavItems