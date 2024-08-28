export const Menu = (props) => {
    const { onSectionChange, menuOpened, setMenuOpened } = props;
  
    return (
      <>
        <button
          onClick={() => setMenuOpened(!menuOpened)}
          className="z-20 fixed top-12 right-12 p-3 bg-white w-11 h-11 rounded-md"
        >
          <div
            className={`bg-black h-0.5 rounded-md w-full transition-all ${
              menuOpened ? "rotate-45  translate-y-0.5" : ""
            }`}
          />
          <div
            className={`bg-black h-0.5 rounded-md w-full my-1 ${
              menuOpened ? "hidden" : ""
            }`}
          />
          <div
            className={`bg-black h-0.5 rounded-md w-full transition-all ${
              menuOpened ? "-rotate-45" : ""
            }`} 
            
          />
        </button>
        <div
          className={`z-10 fixed top-0 right-0 bottom-0 bg-gray-900 transition-all overflow-hidden flex flex-col
        ${menuOpened ? "w-80" : "w-0"}`}
        >
        <div className="flex-1 flex items-start justify-center flex-col gap-6 p-10">
          <div className="navbar-container">
        <div className="child child-1">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <button className="button1 btn-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="#0077B5"
                height="1em"
              >
                <path d="M100.28 448H7.4V149h92.88zm-46.44-343.4c-29.94 0-54.19-24.35-54.19-54.14C-0.35 24.35 24.9 0 54.33 0c29.99 0 54.19 24.35 54.19 54.14 0 29.79-24.2 54.14-54.19 54.14zM447.91 448h-92.9V302.4c0-34.9-12.43-58.7-43.52-58.7-23.71 0-37.77 16.03-43.92 31.51-2.26 5.47-2.83 13.06-2.83 20.62V448h-92.9s1.22-214.68 0-236.5h92.9v33.5c12.35-19 34.41-46.22 83.77-46.22 61.09 0 106.35 39.98 106.35 125.79V448z" />
              </svg>
            </button>
          </a>
        </div>
        <div className="child child-2">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <button className="button1 btn-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                fill="#ff00ff"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </button>
          </a>
        </div>
        <div className="child child-4">
          <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
            <button className="button1 btn-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  d="M255.5 8C119 8 8 119.8 8 256.7c0 117.5 80.7 216.2 188.3 247.5 13.8 2.6 18.8-6 18.8-13.4 0-6.6-.2-24.1-.3-47.2-76.7 16.7-92.9-37.1-92.9-37.1-12.5-31.8-30.5-40.2-30.5-40.2-24.9-17 .2-16.6.2-16.6 27.6 2 42.1 28.4 42.1 28.4 24.4 42.3 63.9 30.1 79.5 23 2.5-17.8 9.6-30.1 17.5-37-61.2-7-125.6-31-125.6-138.2 0-30.5 10.9-55.5 28.7-75.1-2.9-7.1-12.4-35.4 2.7-73.9 0 0 23.4-7.6 76.7 28.7 22.2-6.3 46-9.5 69.6-9.6 23.6.1 47.4 3.2 69.6 9.6 53.2-36.3 76.6-28.7 76.6-28.7 15.2 38.5 5.6 66.8 2.7 73.9 17.8 19.6 28.6 44.6 28.6 75.1 0 107.5-64.5 131-125.8 137.8 9.8 8.5 18.6 25.4 18.6 51.2 0 36.9-.3 66.7-.3 75.7 0 7.5 5 16.2 18.9 13.4 107.6-31.3 188-130 188-247.5C503 119.8 392 8 255.5 8z"
                  fill="#fff"
                />
              </svg>
            </button>
          </a>
        </div>
      </div>
            <MenuButton label="About" onClick={() => onSectionChange(0)} />
            <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
            <MenuButton label="Contact" onClick={() => onSectionChange(2)} />
          </div>
        </div>
      </>
    );
  };
  
  const MenuButton = (props) => {
    const { label, onClick } = props;
    return (
      <button
        onClick={onClick}
        className="text-2xl font-bold text-white cursor-pointer hover:text-indigo-600 transition-colors"
      >
        {label}
      </button>
    );
  };