export default function Footer() {
  return (
    <footer className="mt-10 backdrop-blur-md bg-white/70 border-t border-gray-200 py-6 text-center shadow-sm">
      <p className="text-gray-700 font-medium">SmartResume AI</p>
      <p className="text-gray-500 text-sm mt-1">
        © {new Date().getFullYear()} — Crafted with ❤️ & creativity
      </p>
    </footer>
  );
}
