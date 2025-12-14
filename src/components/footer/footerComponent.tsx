import React from 'react';

function FooterComponent() {
  return (
    <section className="footer w-screen min-h-screen bg-white text-black flex flex-col justify-between items-start">
      <div className="text-start leading-[12] mt-5">
        <h1 className="text-4xl">Interested ?</h1>
        <h1 className="text-xl">Contact me on :</h1>
      </div>
      <div></div>
      <small>© {new Date().getFullYear()} Hai Ho</small>
    </section>
  );
}

export default FooterComponent;
