import Link from 'next/link';
import React from 'react';
import { FaHome, FaRegHospital } from 'react-icons/fa';
import { MdGTranslate } from 'react-icons/md';
import { RiRobot3Line } from 'react-icons/ri';
import { TiThMenu } from 'react-icons/ti';

const linkClassName =
  'flex items-center justify-center rounded-full p-2 hover:scale-110 hover:bg-gray-200 transition-transform transition-colors duration-200 ease-in-out';

export default function BottomNavigateBar() {
  return (
    <div className='z-10 flex h-[90px] w-full items-center justify-evenly gap-5 rounded-xl bg-white shadow-xl'>
      <Link href='/' className={linkClassName}>
        <FaHome size={25} />
      </Link>
      <Link href='/translate' className={linkClassName}>
        <MdGTranslate size={25} />
      </Link>

      <Link href='/nearby' className={linkClassName}>
        <FaRegHospital size={25} />
      </Link>
      <Link href='/ai' className={linkClassName}>
        <RiRobot3Line size={25} />
      </Link>
      <div className={linkClassName}>
        <TiThMenu size={25} />
      </div>
    </div>
  );
}
