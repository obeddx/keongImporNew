// components/Footer.js
export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg">PT. KEONG SUMBER MAKMUR</p>
          <div className="mt-4">
            <p>Email: <a href="mailto:info@keongsumbermakmur.com" className="underline">info@keongsumbermakmur.com</a></p>
            <p>Tel: +62 123 456 789</p>
          </div>
          <div className="mt-4">
            <a href="https://facebook.com" className="text-blue-500 mx-4">Facebook</a>
            <a href="https://instagram.com" className="text-pink-500 mx-4">Instagram</a>
            <a href="https://linkedin.com" className="text-blue-700 mx-4">LinkedIn</a>
          </div>
        </div>
      </footer>
    );
  }
  