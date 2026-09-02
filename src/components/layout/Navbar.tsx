import { useState, useEffect } from "react";
import {
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }

    return false;
  });

  // =====================================================
  // DARK MODE
  // =====================================================

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // =====================================================
  // CLOSE MOBILE MENU
  // =====================================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // =====================================================
  // SECTION NAVIGATION
  // =====================================================

  const handleSectionClick = (
    sectionId: string
  ) => {
    closeMenu();

    if (location.pathname === "/") {
      const element =
        document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    window.location.href =
      `/#${sectionId}`;
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200
        bg-white
        shadow-md
        dark:border-slate-700
        dark:bg-slate-900
      "
    >

      {/* =================================================
          NAVBAR
      ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          px-6
          py-4
        "
      >

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              font-bold
              text-white
            "
          >
            AI
          </div>

          <div>

            <h1
              className="
                text-xl
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              ScoutWise AI
            </h1>

            <p
              className="
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Fake Job Detector
            </p>

          </div>

        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav
          className="
            hidden
            items-center
            gap-8
            lg:flex
          "
        >

          {/* HOME */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick("home")
            }
            className="
              cursor-pointer
              font-medium
              text-slate-700
              transition
              hover:text-blue-600
              dark:text-slate-200
              dark:hover:text-blue-400
            "
          >
            Home
          </button>

          {/* FEATURES */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick("features")
            }
            className="
              cursor-pointer
              font-medium
              text-slate-700
              transition
              hover:text-blue-600
              dark:text-slate-200
              dark:hover:text-blue-400
            "
          >
            Features
          </button>

          {/* HOW IT WORKS */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick("workflow")
            }
            className="
              cursor-pointer
              font-medium
              text-slate-700
              transition
              hover:text-blue-600
              dark:text-slate-200
              dark:hover:text-blue-400
            "
          >
            How It Works
          </button>

          {/* AI ASSISTANT */}

          <Link
            to="/dashboard"
            className="
              cursor-pointer
              font-medium
              text-slate-700
              transition
              hover:text-blue-600
              dark:text-slate-200
              dark:hover:text-blue-400
            "
          >
            AI Assistant
          </Link>

          {/* PRICING */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick("pricing")
            }
            className="
              cursor-pointer
              font-medium
              text-slate-700
              transition
              hover:text-blue-600
              dark:text-slate-200
              dark:hover:text-blue-400
            "
          >
            Pricing
          </button>

        </nav>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          {/* DARK MODE */}

          <button
            type="button"
            aria-label="Toggle dark mode"
            onClick={() =>
              setDarkMode(
                (previous) =>
                  !previous
              )
            }
            className="
              cursor-pointer
              rounded-lg
              p-2
              transition
              hover:bg-slate-100
              dark:hover:bg-slate-700
            "
          >

            {darkMode ? (
              <Sun
                size={20}
                className="text-yellow-400"
              />
            ) : (
              <Moon
                size={20}
                className="
                  text-slate-700
                  dark:text-white
                "
              />
            )}

          </button>

          {/* LOGIN */}

          <Link
            to="/login"
            className="
              hidden
              cursor-pointer
              rounded-lg
              border
              border-slate-300
              px-5
              py-2
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
              md:block
              dark:border-slate-600
              dark:text-white
              dark:hover:bg-slate-800
            "
          >
            Login
          </Link>

          {/* REGISTER */}

          <Link
            to="/register"
            className="
              hidden
              cursor-pointer
              rounded-xl
              bg-blue-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              md:block
            "
          >
            Register
          </Link>

          {/* ANALYZE JOB */}

          <Link
            to="/dashboard"
            className="
              hidden
              cursor-pointer
              rounded-xl
              bg-blue-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              lg:block
            "
          >
            Analyze Job
          </Link>

          {/* MOBILE MENU */}

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() =>
              setMenuOpen(
                (previous) =>
                  !previous
              )
            }
            className="
              cursor-pointer
              rounded-lg
              p-2
              transition
              hover:bg-slate-100
              lg:hidden
              dark:hover:bg-slate-700
            "
          >

            {menuOpen ? (
              <X
                size={28}
                className="
                  text-slate-900
                  dark:text-white
                "
              />
            ) : (
              <Menu
                size={28}
                className="
                  text-slate-900
                  dark:text-white
                "
              />
            )}

          </button>

        </div>

      </div>

      {/* =================================================
          MOBILE MENU
      ================================================= */}

      {menuOpen && (
        <div
          className="
            border-t
            border-slate-200
            bg-white
            dark:border-slate-700
            dark:bg-slate-900
            lg:hidden
          "
        >

          <div
            className="
              flex
              flex-col
              gap-4
              p-6
            "
          >

            {/* HOME */}

            <button
              type="button"
              onClick={() =>
                handleSectionClick("home")
              }
              className="
                cursor-pointer
                text-left
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              Home
            </button>

            {/* FEATURES */}

            <button
              type="button"
              onClick={() =>
                handleSectionClick(
                  "features"
                )
              }
              className="
                cursor-pointer
                text-left
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              Features
            </button>

            {/* HOW IT WORKS */}

            <button
              type="button"
              onClick={() =>
                handleSectionClick(
                  "workflow"
                )
              }
              className="
                cursor-pointer
                text-left
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              How It Works
            </button>

            {/* AI ASSISTANT */}

            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="
                cursor-pointer
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              AI Assistant
            </Link>

            {/* PRICING */}

            <button
              type="button"
              onClick={() =>
                handleSectionClick(
                  "pricing"
                )
              }
              className="
                cursor-pointer
                text-left
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              Pricing
            </button>

            {/* LOGIN */}

            <Link
              to="/login"
              onClick={closeMenu}
              className="
                cursor-pointer
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              Login
            </Link>

            {/* REGISTER */}

            <Link
              to="/register"
              onClick={closeMenu}
              className="
                cursor-pointer
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              Register
            </Link>

            {/* ANALYZE JOB */}

            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="
                cursor-pointer
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-center
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >
              Analyze Job
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}