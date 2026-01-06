// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Users, UserCheck, FileText, TrendingUp, Calendar, Activity, 
  Home, Settings, BarChart3, ClipboardList, LogOut, ChevronRight,
  UserPlus, FilePlus, FolderPlus, Bell, Search, Menu, X
} from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'residentes', label: 'Residentes', icon: Users },
    { id: 'sedepos', label: 'SEDEPOS', icon: ClipboardList },
    { id: 'proyectos', label: 'Proyectos', icon: FolderPlus },
    { id: 'reportes', label: 'Reportes', icon: BarChart3 },
    { id: 'config', label: 'Configuración', icon: Settings },
  ];

  const stats = [
    {
      title: 'Residentes Activos',
      value: '85',
      icon: Users,
      color: 'bg-blue-500',
      trend: '+2.3%',
      trendUp: true,
      description: 'vs mes anterior',
    },
    {
      title: 'Personal Activo',
      value: '48',
      icon: UserCheck,
      color: 'bg-green-500',
      trend: '+2.3%',
      trendUp: true,
      description: 'vs mes anterior',
    },
    {
      title: 'Reportes Pendientes',
      value: '12',
      icon: FileText,
      color: 'bg-orange-500',
      trend: '-5%',
      trendUp: false,
      description: 'vs mes anterior',
    },
    {
      title: 'Proyectos Activos',
      value: '8',
      icon: Activity,
      color: 'bg-purple-500',
      trend: '+8.1%',
      trendUp: true,
      description: 'vs mes anterior',
    },
  ];

  const residentStatus = {
    activos: { value: 85, percentage: 83, color: 'bg-blue-500' },
    transicion: { value: 12, percentage: 12, color: 'bg-yellow-500' },
    egresados: { value: 5, percentage: 5, color: 'bg-green-500' },
  };

  const recentActivities = [
    { id: 1, type: 'system', message: 'Sistema iniciado correctamente', time: 'Hace unos momentos' },
    { id: 2, type: 'resident', message: 'Nuevo residente registrado', time: 'Hace 30 minutos' },
    { id: 3, type: 'report', message: 'Reporte SEDEPOS completado', time: 'Hace 2 horas' },
    { id: 4, type: 'project', message: 'Proyecto "Educación Primaria" actualizado', time: 'Hace 5 horas' },
  ];

  const quickActions = [
    { label: 'Agregar Residente', description: 'Registrar nuevo niño/niña', icon: UserPlus, color: 'blue' },
    { label: 'Crear Reporte', description: 'Generar reporte SEDEPOS', icon: FilePlus, color: 'green' },
    { label: 'Nuevo Proyecto', description: 'Iniciar nuevo proyecto', icon: FolderPlus, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Home className="w-8 h-8 text-blue-600" />
              Hogar de Niños
            </h1>
            <p className="text-sm text-gray-500 mt-1">Sistema de Gestión v1.0.0</p>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700"
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{user?.nombre || user?.username}</p>
                <p className="text-sm text-gray-500">Administrador</p>
              </div>
              <button
                onClick={logout}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-blue-100">
              Bienvenido/a, {user?.nombre || user?.username}. Aquí tienes un resumen de tu sistema.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${stat.color} rounded-xl`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`text-sm ${stat.trendUp ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                      <TrendingUp className="w-4 h-4" />
                      {stat.trend}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-gray-700 font-medium">{stat.title}</p>
                  <p className="text-gray-500 text-sm mt-1">{stat.description}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resident Status Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Estado Residente</h2>
                <span className="text-sm text-gray-500">Distribución actual</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 transition-all duration-500" 
                    style={{ width: `${residentStatus.activos.percentage}%` }}
                  />
                  <div 
                    className="bg-yellow-500 transition-all duration-500" 
                    style={{ width: `${residentStatus.transicion.percentage}%` }}
                  />
                  <div 
                    className="bg-green-500 transition-all duration-500" 
                    style={{ width: `${residentStatus.egresados.percentage}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(residentStatus).map(([key, data]) => (
                    <div key={key} className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className={`w-3 h-3 rounded-full ${data.color}`} />
                        <span className="text-lg font-bold text-gray-800">{data.value}</span>
                      </div>
                      <p className="text-sm text-gray-600 capitalize">{key}</p>
                      <p className="text-sm font-medium text-gray-800">{data.percentage}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">Acciones Rápidas</h2>
              </div>
              
              <div className="space-y-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all hover:scale-[1.02]"
                    >
                      <div className={`p-3 bg-${action.color}-100 rounded-lg`}>
                        <Icon className={`w-6 h-6 text-${action.color}-600`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className={`font-medium text-${action.color}-700`}>{action.label}</div>
                        <div className={`text-sm text-${action.color}-600`}>{action.description}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-6 h-6 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-800">Actividad Reciente</h2>
            </div>
            
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{activity.message}</p>
                    <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;