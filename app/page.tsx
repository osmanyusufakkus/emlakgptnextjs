"use client";

import Container from "./components/Container";
import Typewriter from 'typewriter-effect';

const ParentComponent = () => {
  return (
    <Container>
      <div className="h-[calc(100vh-240px)] flex justify-center items-center font-extrabold text-4xl text-cyan-500">
        <Typewriter options={{
          strings: ['İstanbul, Kadıköy\'de kiralık daire arıyorum <span style="color: #737A85;"> en az  100m2 olmalı</span>', ' <span style="color: #737A85;">2+1 eve ihtiyacım var, en az  100m2 olmalı</span> ve aylık kira ücreti 7500₺\'den az olsun'],
          autoStart: true,
          loop: true,
        }}/>
      </div>
    </Container>
  );
};

export default ParentComponent;