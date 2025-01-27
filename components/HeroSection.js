// components/HeroSection.js
export default function HeroSection() {
    return (
      <section 
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: 'url(/public/gambarbg.jpg)' }}
      >
        <div className="flex items-center justify-center h-full text-white text-center px-4">
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight">PT. KEONG SUMBER MAKMUR</h1>
            <p className="text-2xl">Keong Escargot Berkualitas untuk Anda</p>
            <a href="#products" className="mt-8 inline-block px-8 py-4 bg-blue-600 text-white rounded-full text-lg transition transform hover:bg-blue-700 hover:scale-105">
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>
    );
}
