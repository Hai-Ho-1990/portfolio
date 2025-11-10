import React from 'react';
import aboutMeImg from '../assets/aboutme.png';
import ScrollFloat from './animations/ScrollFloat';

function About() {
  return (
    <section className="about w-full h-screen flex flex-col justify-center  bg-[#fafafa] text-black">
      <h1 className=" tracking-tighter text-center">about me</h1>

      <p className="mt-4 text-2xl  text-center max-w-2xl w-[70%] self-center ">
        {/* <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=10%"
          scrollEnd="bottom bottom-=15%"
          stagger={0.13}
        > */}
        I am a passionate web developer with a focus on creating dynamic and responsive user
        experiences.
        {/* </ScrollFloat> */}
      </p>
      <img src={aboutMeImg} alt="About Me" className="self-center pt-10" />
    </section>
  );
}

export default About;
