import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

export default async function(){

  return (
    <div className="w-full h-full dark text-foreground bg-background">
      <Navbar>
        <NavbarBrand>
          <NavbarItem>
            SiteGuardian
          </NavbarItem>
        </NavbarBrand>
        <NavbarContent justify="center">
          <Link href="#">Docs</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Company</Link>
        </NavbarContent>
        <NavbarContent justify="end">
          <Link href="/login">Sign In</Link>
          <Button as={Link} href="/signup" color="primary" variant="ghost">Sign Up</Button>
        </NavbarContent>
      </Navbar>
    </div>
  );
}