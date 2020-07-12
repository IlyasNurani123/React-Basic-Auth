import React from 'react';
import Navbar from './NavigationBar';
export default function SideLessLayout(props) {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}
