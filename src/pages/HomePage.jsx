/**
 * HomePage
 * Página de inicio inspirada en Aldeas Infantiles SOS
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Home, Users, FileText, FolderKanban, ArrowRight, Heart, 
  Shield, BookOpen, MessageSquare, Phone, Menu, X, Search,
  Calendar, TrendingUp, CheckCircle, Target, Gift, HandHeart
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(70);

  const navItems = [
    { label: 'CONÓCENOS', route: '/nosotros' },
    { label: 'CÓMO AYUDAR', route: '/ayuda' },
    { label: 'EMPRESAS SOS', route: '/empresas' },
    { label: 'CONVOCATORIAS', route: '/convocatorias' },
    { label: 'CONTÁCTANOS', route: '/contacto' },
  ];

  const quickActions = [
    {
      icon: Heart,
      title: 'Soy Amigo SOS',
      description: 'Únete como donante recurrente',
      color: 'bg-red-100 text-red-600',
      borderColor: 'border-red-200',
      route: '/amigo-sos'
    },
    {
      icon: Gift,
      title: 'Ayuda hoy',
      description: 'Donación única inmediata',
      color: 'bg-orange-100 text-orange-600',
      borderColor: 'border-orange-200',
      route: '/donar'
    },
    {
      icon: HandHeart,
      title: 'Voluntariado',
      description: 'Ofrece tu tiempo y talento',
      color: 'bg-green-100 text-green-600',
      borderColor: 'border-green-200',
      route: '/voluntariado'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Residentes',
      description: 'Gestión integral de niños y niñas',
      stats: '85 activos',
      color: 'bg-blue-500',
      route: '/ninios',
    },
    {
      icon: Shield,
      title: 'Usuarios',
      description: 'Personal y administradores',
      stats: '48 activos',
      color: 'bg-green-500',
      route: '/usuarios',
    },
    {
      icon: FileText,
      title: 'SEDEPOS',
      description: 'Reportes gubernamentales',
      stats: '12 pendientes',
      color: 'bg-purple-500',
      route: '/sedepos',
    },
    {
      icon: FolderKanban,
      title: 'Proyectos',
      description: 'Programas y actividades',
      stats: '8 activos',
      color: 'bg-orange-500',
      route: '/proyectos',
    },
  ];

  const donationOptions = [20, 50, 70, 100, 200];

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-red-600">
                  ALDEAS INFANTILES SOS
                </h1>
                <p className="text-sm text-gray-600 font-medium">BOLIVIA</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.route)}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
                INGRESAR
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.route);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 text-gray-700 hover:text-red-600 font-medium border-b"
                >
                  {item.label}
                </button>
              ))}
              <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
                INGRESAR
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              DONA HOY
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Informate y conoce de cerca las historias sobre nuestro trabajo por la niñez.
            </p>
            
            {/* Donation Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-800">Mensajero SOS</h3>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">Selecciona tu aporte</p>
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {donationOptions.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        donationAmount === amount
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-red-300'
                      }`}
                    >
                      Bs. {amount}
                    </button>
                  ))}
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">Tu aporte seleccionado</p>
                  <p className="text-4xl font-bold text-red-600">Bs. {donationAmount}</p>
                </div>
                
                <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-[1.02]">
                  ADQUIERE TU TICKET
                </button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                * Tu donación contribuye directamente al bienestar de los niños
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sistema de Gestión Integral
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Plataforma diseñada para optimizar la administración y cuidado en hogares infantiles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(feature.route)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group border border-gray-100 hover:border-red-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${feature.color} rounded-xl group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      {feature.stats}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-red-600 group-hover:text-red-700">
                    <span className="text-sm font-medium mr-2">Acceder</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Formas de Contribuir
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(action.route)}
                  className={`border-2 ${action.borderColor} rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white`}
                >
                  <div className={`inline-flex p-3 rounded-lg ${action.color} mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {action.description}
                  </p>
                  <div className="flex items-center text-gray-600 group-hover:text-red-600">
                    <span className="text-sm font-medium mr-2">Más información</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                Impacto del Sistema v1.0.0
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">+2.3%</div>
                  <p className="text-gray-600">Crecimiento mensual</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">83%</div>
                  <p className="text-gray-600">Residentes activos</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">8.1%</div>
                  <p className="text-gray-600">Avance proyectos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">ALDEAS INFANTILES SOS</h3>
              <p className="text-gray-400">BOLIVIA</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">
                Utilizamos cookies para mejorar tu experiencia.
              </p>
              <p className="text-gray-400 text-sm">
                Usted acepta nuestras cookies si continúa utilizando este sitio web.
                <a href="#" className="text-red-400 hover:text-red-300 ml-1">
                  Más información
                </a>
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>Sistema de Gestión © {new Date().getFullYear()} - Todos los derechos reservados</p>
            <p className="text-sm mt-2">Cuidando el futuro de la niñez boliviana</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;