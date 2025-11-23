"use client";

import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function PaginaAdicionarProdutos() {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSalvar = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMensagem("Usuário não autenticado.");
      return;
    }
    
    try {
      const response = await fetch("http://127.0.0.1:5000/produtos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`, // TOKEN VÁLIDO (produtos é restrito então para acessar precisa de uar o token que envia no postamn auth/login, esta lá usuario e senha)
        },
        body: JSON.stringify({
          nome,
          quantidade: parseFloat(quantidade),
          preco: parseFloat(preco),
          tipo_id: parseInt(tipoId),
        }),
      });

      if (response.ok) {
        setMensagem("Produto adicionado com sucesso!");
        resetarFormulario();
      } else {
        const errorData = await response.json();
        setMensagem("Erro: " + (errorData.message || "Não foi possível adicionar."));
      }
    } catch (error) {
      setMensagem("Não foi possível conectar à API.");
    }
  };

  const resetarFormulario = () => {
    setNome("");
    setQuantidade("");
    setPreco("");
    setTipoId("");
  };

  return (
    <div className="min-h-screen p-8 bg-[url('/mesaBuque.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-semibold text-white mb-6 pt-4">
          Adicionar Produto
        </h2>


        <div className="bg-[#D3F0E3] p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-5 text-gray-800">
            Cadastro de Produto
          </h3>

          <div className="grid grid-cols-1 gap-4">

            <input
              type="text"
              placeholder="Nome do Produto"
              className="border p-3 rounded w-full border-[#9FC5B4] 
              focus:outline-none focus:ring-2 focus:ring-emerald-500 
              placeholder-gray-400 text-gray-900"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="number"
              placeholder="Quantidade"
              className="border p-3 rounded w-full border-[#9FC5B4] 
              focus:outline-none focus:ring-2 focus:ring-emerald-500 
              placeholder-gray-400 text-gray-900"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />

            <input
              type="number"
              placeholder="Preço"
              className="border p-3 rounded w-full border-[#9FC5B4] 
              focus:outline-none focus:ring-2 focus:ring-emerald-500 
              placeholder-gray-400 text-gray-900"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />

            <input
              type="number"
              placeholder="Tipo ID (ex: 1, 2, 3...)"
              className="border p-3 rounded w-full border-[#9FC5B4] 
              focus:outline-none focus:ring-2 focus:ring-emerald-500 
              placeholder-gray-400 text-gray-900"
              value={tipoId}
              onChange={(e) => setTipoId(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleSalvar}
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg 
              hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <PlusCircle size={18} />
              Adicionar Produto
            </button>
          </div>

          {mensagem && (
            <p className="text-green-700 font-semibold mt-4">{mensagem}</p>
          )}
        </div>

        <button
          onClick={() => window.history.back()}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
