import {
  Button,
  Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger,
  Image,
  Link,
  Navbar, NavbarBrand, NavbarContent, NavbarItem
} from "@nextui-org/react";

import { IoChevronDownSharp } from 'react-icons/io5'

export default async function () {



  return (
    <div className="w-full h-full dark text-foreground bg-background">
      <Navbar isBordered isBlurred>
        <NavbarBrand>
          <Image src="/img/SiteGuardianLogo.png" width={40} height={40} radius="none" />
          <p>
            SiteGuardian
          </p>
        </NavbarBrand>
        <NavbarContent justify="center">
          <NavbarItem>
            <Link href="https://docs.siteguardian.io">Docs</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pricing">Pricing</Link>
          </NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<IoChevronDownSharp />}
                  radius="sm"
                  variant="light"
                >
                  Features
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu>
              <DropdownItem>Jobs</DropdownItem>
              <DropdownItem>Website</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        <NavbarContent justify="end">
          <Link href="/login">Sign In</Link>
          <Button as={Link} href="/signup" color="primary" variant="ghost">Sign Up</Button>
        </NavbarContent>
      </Navbar>
      <div className="w-full h-[calc(100svh-65px)] overflow-scroll overscroll-auto px-8 pt-20 flex flex-col items-center">
        <div className="border-zinc-800 border h-20 w-full max-w-[1100px]">

        </div>
      </div>
    </div>
  );
}
