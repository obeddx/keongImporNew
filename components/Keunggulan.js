// components/KeunggulanSection.js
export default function KeunggulanSection() {
    return (
      <section id="keunggulan" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-12">Keunggulan Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Keunggulan 1 */}
            <div className="keunggulan-card bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl text-blue-600 mb-4">
                {/* Ikon dapat diganti dengan SVG atau font awesome */}
                <i className="fas fa-cogs"></i> 
              </div>
              <h3 className="text-xl font-semibold">Keunggulan 1</h3>
              <p className="mt-4">Deskripsi singkat tentang keunggulan pertama perusahaan kami.</p>
            </div>
            
            {/* Keunggulan 2 */}
            <div className="keunggulan-card bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl text-blue-600 mb-4">
                <i className="fas fa-shield-alt"></i> 
              </div>
              <h3 className="text-xl font-semibold">Keunggulan 2</h3>
              <p className="mt-4">Deskripsi singkat tentang keunggulan kedua perusahaan kami.</p>
            </div>
  
            {/* Keunggulan 3 */}
            <div className="keunggulan-card bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl text-blue-600 mb-4">
                <i className="fas fa-thumbs-up"></i> 
              </div>
              <h3 className="text-xl font-semibold">Keunggulan 3</h3>
              <p className="mt-4">Deskripsi singkat tentang keunggulan ketiga perusahaan kami.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  