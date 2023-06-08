export const Footer = () => {
  return (
    <footer className="m-4 rounded-2xl py-8 px-5 relative z-10 bg-def-block">
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
