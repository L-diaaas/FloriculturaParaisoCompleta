export default function Header({ search, setSearch }) {
  return (
    <header className="w-full text-center py-10">
      <h1 className="text-4xl font-semibold text-green-700 drop-shadow-sm">
        Sessão administrativa
      </h1>

      <p className="text-gray-500 mt-2 text-sm">Seja bem-vindo(a)!</p>

      {setSearch && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <input
            type="text"
            placeholder="🔍 Search"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#E6F4EF] w-96 py-2 px-4 rounded-full shadow text-black outline-none placeholder:text-gray-500"
          />
        </div>
      )}
    </header>
  );
}
