"use client";

import Container from "./components/Container";

const ParentComponent = () => {
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
      </div>
    </Container>
  );
};

export default ParentComponent;
