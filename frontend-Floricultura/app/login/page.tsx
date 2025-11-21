"use client";
import { useState } from "react";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login realizado com sucesso!");
        window.location.href = "/admin";
      } else {
        alert(data.erro || "Usuário ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert("Erro de conexão com o servidor.");
    }
  }

  function entrarSemLogin() {
    window.location.href = "/admin"; 
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[url(/fotoFundo.jpg)] bg-cover bg-center">
      <div className="flex md:w-120 md:h-150 rounded-lg shadow-md bg-green-50/50 justify-center gap-x-10">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center mt-20 w-80"
        >
          <div className="md:size-15 size-10 bg-[url(/LoginIco.png)] bg-cover bg-center mb-4"></div>
          <p className="md:text-2xl text-medium text-teal-900 font-bold text-center">
            Bem-vindo(a)!
          </p>
          <p className="md:text-sm text-xs text-black font-medium text-center">
            O acesso é restrito a pessoas autorizadas.
          </p>

          <div className="md:mt-6 md:w-full mt-3 w-[70%]">
            <label
              htmlFor="usuario"
              className="block text-sm font-medium text-teal-900 mb-1"
            >
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="usuario"
              className="w-full pl-4 pr-4 py-3 border border-verdepastel rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-verdepastel/50"
            />

            <label
              htmlFor="senha"
              className="block text-sm font-medium text-teal-900 mb-1 mt-2"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-4 pr-4 py-3 border border-verdepastel rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-verdepastel/50"
            />
          </div>

          <div className="flex md:justify-end justify-center mb-6 mt-3 w-full">
            <a
              href="#"
              className="text-sm underline font-medium text-gray-700 hover:text-teal-900 transition duration-150"
            >
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="md:mt-6 mb-15 md:mb-0 md:w-40 w-25 bg-verdesaja hover:bg-teal-900 text-white font-semibold py-3 transition duration-200 rounded-xl shadow-md"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
