"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface NavLink {
  href: string
  label: string
}

interface MobileNavProps {
  open: boolean
  onClose: () => void
  links: NavLink[]
}

export function MobileNav({ open, onClose, links }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-64">
        <div className="flex flex-col gap-6 mt-12">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
