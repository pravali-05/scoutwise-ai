import Container from "./Container";

export default function Footer() {
  return (
    <footer
      className="mt-20 border-t border-gray-200 bg-white py-8 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950"
    >
      <Container>
        <p className="text-center text-gray-500 dark:text-slate-400">
          © 2026 ScoutWise AI. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}