import React from 'react';

function footerComponent() {
  return (
    <section className="footer w-screen min-h-screen bg-white text-black  flex justify-center items-center">
      <small>© {new Date().getFullYear()} Hai Ho</small>
    </section>
  );
}

export default footerComponent;
