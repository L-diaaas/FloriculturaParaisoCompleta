"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Package } from "lucide-react";

type Produto = {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
  tipo_id: number;
};

type Tipo = {
  id: number;
  nome: string;
};

const mockTipos: Tipo[] = [
  { id: 1, nome: "Flores" },
  { id: 2, nome: "Buquês" },
  { id: 3, nome: "Presentes" },
];

const initialProdutos: Produto[] = [
  { id: 11, nome: "Lírios Rosa", quantidade: 10, preco: 39.9, tipo_id: 1 },
  { id: 12, nome: "Buquê Romântico", quantidade: 5, preco: 120.0, tipo_id: 2 },
  { id: 13, nome: "Caixa Presente", quantidade: 20, preco: 19.9, tipo_id: 3 },
];

const emptyProduto: Produto = {
  id: 0,
  nome: "",
  quantidade: 0,
  preco: 0,
  tipo_id: 0,
};

export default function PaginaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>(initialProdutos);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto>(emptyProduto);

  const COR_FUNDO = "bg-[#D3F0E3]";
  const COR_BORDA_CABECALHO = "bg-[#9FC5B4]";
  const COR_DIVISORIA = "divide-[#9FC5B4]";
  const COR_PRINCIPAL = "bg-emerald-600";
  const COR_PRINCIPAL_HOVER = "hover:bg-emerald-700";

  const getTipoNome = (id: number) => {
    const tipo = mockTipos.find((t) => t.id === id);
    return tipo ? tipo.nome : "Tipo Desconhecido";
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handleAtualizar = (id: number) => {
    const produto = produtos.find((p) => p.id === id);
    if (produto) {
      setProdutoEmEdicao(produto);
      setEditandoId(id);
    }
  };

  const handleExcluir = (id: number) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto ${id}?`)) {
      setProdutos(produtos.filter((p) => p.id !== id));
      setEditandoId(null);
    }
  };

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();

    setProdutos(
      produtos.map((p) =>
        p.id === produtoEmEdicao.id ? produtoEmEdicao : p
      )
    );

    setEditandoId(null);
    setProdutoEmEdicao(emptyProduto);
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setProdutoEmEdicao(emptyProduto);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let newValue: string | number = value;

    if (name === "quantidade" || name === "preco" || name === "tipo_id") {
      newValue = Number(value);
    }

    setProdutoEmEdicao((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      
      <img
        src="/fundoFloresRosas.jpg"
        className="absolute inset-0 w-full h-full object-cover object-top z-0 opacity-30 md:opacity-100"
      />

      <div className="absolute inset-0 bg-black opacity-0 z-[5]"></div>

      <div className="container mx-auto max-w-6xl relative z-10">


        <a
          href="/admin/"
          className="px-4 py-2 rounded-md bg-verdesaja text-white hover:bg-teal-900 transition shadow-md inline-block"
        >
          Voltar
        </a>

        <h2 className="text-2xl md:text-3xl font-semibold text-teal-900 mb-6 pt-4">
          Gestão de Produtos
        </h2>


        <div className="flex flex-col md:flex-row justify-end gap-3 mb-6">
          <a
            href="/admin/produtos/adicionar"
            className="px-5 py-2 rounded-md bg-teal-900 text-white hover:bg-verdepastel transition shadow-md text-center"
          >
            + Adicionar Produto
          </a>

          <a
            href="/admin/tipos"
            className="px-5 py-2 rounded-md bg-verdesaja text-white hover:bg-teal-900 transition shadow-md text-center"
          >
            Ir para Tipos
          </a>
        </div>


        {editandoId !== null && (
          <div className={`${COR_FUNDO} p-6 rounded-lg shadow-lg mb-8 bg-opacity-90`}>
            <h3 className="text-xl font-semibold mb-5 text-gray-700">
              Editar Produto {produtoEmEdicao.id}
            </h3>

            <form onSubmit={handleSalvar} className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  name="nome"
                  value={produtoEmEdicao.nome}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#9FC5B4] text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade
                </label>
                <input
                  type="number"
                  name="quantidade"
                  value={produtoEmEdicao.quantidade || ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#9FC5B4] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="preco"
                  value={produtoEmEdicao.preco || ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#9FC5B4] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  name="tipo_id"
                  value={produtoEmEdicao.tipo_id}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#9FC5B4] text-gray-800 bg-white"
                  required
                >
                  <option value="">Selecione um tipo...</option>
                  {mockTipos.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col md:flex-row justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCancelar}
                  className="px-6 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 w-full md:w-auto"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className={`px-6 py-2 rounded-md ${COR_PRINCIPAL} text-white ${COR_PRINCIPAL_HOVER} flex items-center justify-center w-full md:w-auto`}
                >
                  <Pencil size={18} className="mr-2" /> Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        )}

        <div
          className={`${COR_FUNDO} rounded-lg shadow-lg overflow-hidden border border-[#9FC5B4] bg-opacity-90`}
        >
          <table className="hidden md:table min-w-full divide-y divide-[#9FC5B4]">
            <thead className={COR_BORDA_CABECALHO}>
              <tr>
                {["ID", "Nome", "Quantidade", "Preço", "Tipo", "Ações"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-white uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={`divide-y ${COR_DIVISORIA}`}>
              {produtos.map((produto) => (
                <tr
                  key={produto.id}
                  onClick={() => handleAtualizar(produto.id)}
                  className="cursor-pointer hover:bg-opacity-70"
                >
                  <td className="px-6 py-4">{produto.id}</td>
                  <td className="px-6 py-4">{produto.nome}</td>
                  <td className="px-6 py-4">{produto.quantidade}</td>
                  <td className="px-6 py-4">{formatCurrency(produto.preco)}</td>
                  <td className="px-6 py-4">{getTipoNome(produto.tipo_id)}</td>

                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAtualizar(produto.id);
                      }}
                      className="text-blue-700 hover:text-blue-900"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExcluir(produto.id);
                      }}
                      className="text-red-700 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="md:hidden divide-y divide-[#9FC5B4]">
            {produtos.map((p) => (
              <div
                key={p.id}
                className="p-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{p.nome}</h3>
                  <span className="text-sm text-gray-600">#{p.id}</span>
                </div>

                <p className="text-sm mt-1"><strong>Quantidade:</strong> {p.quantidade}</p>
                <p className="text-sm"><strong>Preço:</strong> {formatCurrency(p.preco)}</p>
                <p className="text-sm mb-2"><strong>Tipo:</strong> {getTipoNome(p.tipo_id)}</p>

                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => handleAtualizar(p.id)}
                    className="flex-1 py-2 rounded bg-verdesaja text-white"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(p.id)}
                    className="flex-1 py-2 rounded bg-red-700 text-white"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
