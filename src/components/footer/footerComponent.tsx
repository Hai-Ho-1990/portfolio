import React from 'react';

function footerComponent() {
  return (
    <section className="footer w-full ">
      <small>© {new Date().getFullYear()} Hai Ho</small>
    </section>
  );
}

export default footerComponent;
