"use client";

import Image from "next/image";
import React from "react";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { ArrowDown2, CloseSquare, HambergerMenu } from "iconsax-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: "80vw",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
      role="presentation"
      // onMouseEnter={toggleDrawer(false)}
    >
      <Link
        onClick={toggleDrawer(false)}
        className="font-normal text-base text-center text-[#012376]"
        style={{ fontWeight: "700" }}
        href="/"
      >
        Home
      </Link>
      <Link
        onClick={toggleDrawer(false)}
        className="font-normal text-base text-center text-[#012376]"
        style={{ fontWeight: "700" }}
        href="/about"
      >
        About
      </Link>
      <Link
        onClick={toggleDrawer(false)}
        className="font-normal text-base text-center text-[#012376]"
        style={{ fontWeight: "700" }}
        href="/verify"
      >
        eVerify
      </Link>
      <Link
        onClick={toggleDrawer(false)}
        className="font-normal text-base text-center text-[#012376]"
        style={{ fontWeight: "700" }}
        href="/generate"
      >
        Upload Certificates
      </Link>
      <Link
        onClick={toggleDrawer(false)}
        className="font-normal text-base text-center text-[#012376]"
        style={{ fontWeight: "700" }}
        href="/ceta"
      >
        CETA
      </Link>
      <Link
        onClick={toggleDrawer(false)}
        className="font-normal text-base text-center text-[#012376]"
        style={{ fontWeight: "700" }}
        href="/media"
      >
        Media Mentions
      </Link>
      <Link
        onClick={toggleDrawer(false)}
        className="font-normal text-base text-center text-[#012376]"
        style={{ fontWeight: "700" }}
        href="https://edubuk.co.in/contact-us"
        target="_blank"
      >
        Contact Us
      </Link>
      <Link
        onClick={toggleDrawer(false)}
        className="font-normal text-base text-center text-[#012376]"
        style={{ fontWeight: "700" }}
        href="/login"
      >
        Login
      </Link>
    </Box>
  );

  return (
    <div className="hidden sem:flex">
      <Button onClick={toggleDrawer(true)}>
        <HambergerMenu size="36" color="#333" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col py-4 px-8 items-end">
            <CloseSquare onClick={toggleDrawer(false)} size="32" color="#666" />
          </div>
          {DrawerList}
        </div>
      </Drawer>
    </div>
  );
}

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  
    return (
      <div className={`${inter.className} bg-navbar-bg bg-cover bg-no-repeat`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 px-6">
            <Link href="/">
              <Image alt="logo" src="/images/newLogo.png" width={75} height={75} />
            </Link>
            
            <div className="flex bg-white bg-opacity-20 rounded-[10px] px-5 py-4 items-center space-x-6 sem:hidden shadow-navbar-shadow">
              <Link href="/">
                <span className="font-normal text-base text-center text-[#000000]">Home</span>
              </Link>
              <Link href="/about">
                <span className="font-normal text-base text-center text-[#000000]">About</span>
              </Link>
              <Link href="/verify">
                <span className="font-normal text-base text-center text-[#000000]">eVerify</span>
              </Link>
              <Link href="/generate">
                <span className="whitespace-nowrap font-normal text-base text-center text-[#000000]">eSeal</span>
              </Link>
              <Link href="/ceta">
                <span className="font-normal text-base text-center text-[#000000]">CETA</span>
              </Link>
              <Link href="/media">
                <span className="whitespace-nowrap font-normal text-base text-center text-[#000000]">Media Mentions</span>
              </Link>
              <Link href="https://edubuk.co.in/contact-us" target="_blank">
                <span className="whitespace-nowrap font-normal text-base text-center text-[#000000]">Contact Us</span>
              </Link>

              <Link href="/dashboard/admin">
              <span className="whitespace-nowrap font-normal text-base text-center text-[#000000]">Admin</span>
              </Link>

              <Link href="/login">
                <button className={`rounded-[20px] font-normal text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} py-2 px-6`}>
                  Login
                </button>
              </Link>
              
            </div>
            
            <TemporaryDrawer />
          </div>
        </div>
      </div>
    );
  };

export default Navbar;
