export const Footer = () => {
  return (
    <footer className="py-8 px-5 z-10 bg-black fixed bottom-0 w-full">
      <nav className="flex mx-auto max-w-screen-2xl justify-between">
        <a
          data-animBio="text"
          href="/"
          className="font-semibold text-center text-3xl !leading-3"
        >
          Spoti
        </a>
        <div
          data-animBio="text"
          className="flex flex-col sm:flex-row text-right sm:text-center"
        ></div>
      </nav>
    </footer>
  );
};
