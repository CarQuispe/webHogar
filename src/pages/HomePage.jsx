import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const photos = [
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiSQSrvlFF01a37z9SBPcq99SgMdYERuC2ow7le67K3N3EcZa3u4rUW9YpYeesuFTuEE3j2QJ_gvg86Wm3ubxyCnzpf1TvE9KJJG3QKFu8zgkj38VcuVamnMTS4gnse23DrYHZIsXjZwnqvkHv7WCrO0fWg2DfZyir3TSJEUTVtUUnvGalRciUnNQpxgg/s1754/santa_emilia_rodat.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZPCsM6C56fOrocjog49Mi1J1MpJJHmpyQ_X3cFegowR2LZjoo03dBfESY7qW5NoRKgXXw69KHSGSjQsYeVON0dnkgWNNdQDPFaNmbaWeOUpAlhV629GQ4aOsEhu0hYL6a0Uoptx5WPd7k/s1600/Hogar+Santa+Emilia.jpg',
 
];

const HomePage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(50);
  const [photoIndex, setPhotoIndex] = useState(0);

  const features = [
    {
      title: 'Iniciar sesión',
      description: 'Acceso al sistema institucional.',
      route: '/login',
      color: 'bg-red-600'
    },
    {
      title: 'Familias',
      description: 'Apoyo social y psicológico continuo.',
      route: '/familias',
      color: 'bg-orange-500'
    },
    {
      title: 'Salud',
      description: 'Atención médica permanente.',
      route: '/salud',
      color: 'bg-amber-500'
    },
    {
      title: 'Educación',
      description: 'Formación para un futuro digno.',
      route: '/educacion',
      color: 'bg-yellow-500'
    }
  ];

  const nextPhoto = () =>
    setPhotoIndex((prev) => (prev + 1) % photos.length);

  const prevPhoto = () =>
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div
            className="font-bold text-lg cursor-pointer"
            onClick={() => navigate('/')}
          >
            CENTRO DE ACOGIDA “SANTA EMILIA”
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 font-semibold">
           
            <button onClick={() => navigate('/proyectos')}>Iniciar sesión</button>
            <button onClick={() => navigate('/contacto')}>Contacto</button>
            <button
              onClick={() => navigate('/donar')}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
            >
              Donar
            </button>
          </nav>

          {/* Mobile Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col p-4 gap-4 font-semibold">
              
              <button onClick={() => navigate('/proyectos')}>Iniciar sesión</button>
              <button onClick={() => navigate('/contacto')}>Contacto</button>
              <button
                onClick={() => navigate('/donar')}
                className="bg-red-600 text-white py-2 rounded-xl"
              >
                Donar
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400" />
        <div className="absolute inset-0 bg-black/30" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 py-28 text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ANTE TODO LA CARIDAD<br />“Santa Emilia”
          </h1>

          <p className="max-w-2xl mx-auto mb-10 text-lg text-white/90">
            Cada donación ayuda a construir un futuro seguro para niñas y niños en situación vulnerable.
          </p>

          {/* ================= CAROUSEL ================= */}
          <div className="relative max-w-3xl mx-auto mb-14">
            <img
              src={photos[photoIndex]}
              alt="Centro de acogida"
              className="rounded-2xl shadow-xl w-full h-72 object-cover"
            />
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
            >
              <ChevronRight />
            </button>
          </div>

          {/* ================= DONATION CARD ================= */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/90 backdrop-blur-xl text-gray-900 rounded-3xl p-8 max-w-md mx-auto shadow-2xl"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="text-red-600" />
              <h3 className="text-2xl font-bold">Aporta esperanza</h3>
            </div>

            <div className="flex justify-center gap-3 mb-6">
              {[20, 50, 100, 200].map((a) => (
                <button
                  key={a}
                  onClick={() => setDonationAmount(a)}
                  className={`px-4 py-2 rounded-xl font-semibold transition ${
                    donationAmount === a
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 hover:bg-red-100'
                  }`}
                >
                  Bs. {a}
                </button>
              ))}
            </div>

            <p className="text-3xl font-bold text-red-600 mb-6">
              Bs. {donationAmount}
            </p>

            <button
              onClick={() => navigate('/donar')}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 rounded-2xl font-bold"
            >
              Donar ahora
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              onClick={() => navigate(f.route)}
              className="bg-white p-6 rounded-2xl shadow-md cursor-pointer"
            >
              <div className={`w-12 h-12 ${f.color} rounded-xl mb-4`} />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 mb-4">{f.description}</p>
              <div className="flex items-center text-red-600 font-medium">
                Ver más <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center">
        <p className="font-semibold">Fundación Hogar</p>
        <p className="text-sm">
          © {new Date().getFullYear()} Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
