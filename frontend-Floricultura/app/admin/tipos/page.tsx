"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

type Tipo = {
  id: number;
  nome: string;
};

const API_URL = "http://localhost:5000";

export default function PaginaTipos() {
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [nome, setNome] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);


  async function carregarTipos() {
    const res = await fetch(`${API_URL}/tipos/`);
    const data = await res.json();
    setTipos(data);
  }

  useEffect(() => {
    carregarTipos();
  }, []);


  async function handleSalvar() {
    if (!nome.trim()) return alert("Digite um nome válido!");

    if (editandoId !== null) {

      const res = await fetch(`${API_URL}/tipos/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message || "Erro ao atualizar o tipo");

    } else {

      const res = await fetch(`${API_URL}/tipos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message || "Erro ao adicionar tipo");
    }

    resetarFormulario();
    carregarTipos();
  }


  const handleEditar = (tipo: Tipo) => {
    setEditandoId(tipo.id);
    setNome(tipo.nome);
  };


  async function handleExcluir(id: number) {
    if (!confirm("Tem certeza que deseja excluir este tipo?")) return;

    const res = await fetch(`${API_URL}/tipos/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message || "Erro ao excluir tipo");

    carregarTipos();
  }

  const resetarFormulario = () => {
    setEditandoId(null);
    setNome("");
  };

  return (
    <div
      className="min-h-screen p-4 sm:p-6 md:p-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/tipos-img.png')" }}
    >
      <div className="container mx-auto max-w-5xl bg-white/20 backdrop-blur-sm p-4 rounded-xl sm:p-6 md:p-8">

        <a
          href="/admin/"
          className="px-4 py-1 rounded-md bg-verdesaja text-white hover:bg-teal-900 transition-colors duration-150 shadow-md text-sm sm:text-base"
        >
          Voltar
        </a>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6 mt-4 drop-shadow">
          Gestão de Tipos de Produtos
        </h2>


        <div className="bg-[#D3F0E3] p-4 sm:p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-5 text-gray-800">
            {editandoId ? "Editar Tipo" : "Adicionar Novo Tipo"}
          </h3>

          <input
            type="text"
            placeholder="Nome do Tipo (ex: Rosas)"
            className="border p-3 rounded w-full border-[#9FC5B4] focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400 text-gray-900"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            {editandoId && (
              <button
                onClick={resetarFormulario}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            )}

            <button
              onClick={handleSalvar}
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <PlusCircle size={18} />
              {editandoId ? "Salvar Alterações" : "Adicionar Tipo"}
            </button>
          </div>
        </div>


        <div className="bg-[#D3F0E3] rounded-lg shadow-lg overflow-x-auto border border-[#9FC5B4]">
          <table className="min-w-full divide-y divide-[#9FC5B4] text-sm">
            <thead className="bg-[#9FC5B4]">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left font-medium text-white uppercase">ID</th>
                <th className="px-4 sm:px-6 py-3 text-left font-medium text-white uppercase">Nome do Tipo</th>
                <th className="px-4 sm:px-6 py-3 text-right font-medium text-white uppercase">Ações</th>
              </tr>
            </thead>

            <tbody className="bg-[#D3F0E3] divide-y divide-[#9FC5B4]">
              {tipos.map((tipo) => (
                <tr key={tipo.id} className="hover:bg-[#c8e9d6]">
                  <td className="px-4 sm:px-6 py-4">{tipo.id}</td>
                  <td className="px-4 sm:px-6 py-4">{tipo.nome}</td>

                  <td className="px-4 sm:px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => handleEditar(tipo)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleExcluir(tipo.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
