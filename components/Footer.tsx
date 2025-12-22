export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-gray-100 border-t border-gray-300 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-600 text-sm">
          <p>Davis Family Challenge &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
