// Sidebar.tsx
export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#E6F4EF] shadow-md border-r border-gray-200 rounded-r-3xl p-6 flex flex-col fixed">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <img src="/images/logo.png" alt="Logo" className="w-34" />
      </div>

      {/* Usuário */}
      <div className="mb-10 flex items-center gap-3">
        <img src="/images/avatar.png" alt="Usuário" className="w-10 h-10 rounded-full" />
        <span className="font-medium text-gray-700">Usuário</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4 text-gray-700">
        <a href="#" className="hover:text-green-700">Sobre nós</a>
        <a href="/" className="hover:text-green-700">Início</a>
        <a href="#" className="hover:text-green-700">Contatos Adm</a>
        <a href="#" className="hover:text-green-700">Dashboard</a>
      </nav>
    </aside>
  );
}
