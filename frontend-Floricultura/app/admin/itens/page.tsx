"use client";

import React, { useState } from "react";
import { PlusCircle, Edit, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Item = {
  id: number;
  compra_id: number;
  produto_id: number;
  quantidade: number;
  valor_unitario: number;
};

const mockItens: Item[] = [
  { id: 1, compra_id: 10, produto_id: 1, quantidade: 2, valor_unitario: 12.5 },
  { id: 2, compra_id: 12, produto_id: 2, quantidade: 1, valor_unitario: 25.0 },
];

export default function PaginaItens() {
  const [itens, setItens] = useState<Item[]>(mockItens);

  const [compraId, setCompraId] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const customConfirm = (message: string): boolean => {
    console.log(`Confirmação: ${message}`);
    return true;
  };

  const resetarFormulario = () => {
    setEditandoId(null);
    setCompraId("");
    setProdutoId("");
    setQuantidade("");
    setValorUnitario("");
  };

  const handleSalvar = () => {
    if (!compraId || !produtoId || !quantidade || !valorUnitario) {
      alert("Preencha todos os campos!");
      return;
    }

    if (editandoId !== null) {
      setItens(
        itens.map((item) =>
          item.id === editandoId
            ? {
                id: editandoId,
                compra_id: Number(compraId),
                produto_id: Number(produtoId),
                quantidade: Number(quantidade),
                valor_unitario: Number(valorUnitario),
              }
            : item
        )
      );
    } else {
      const novoId =
        itens.length > 0 ? Math.max(...itens.map((i) => i.id)) + 1 : 1;

      setItens([
        ...itens,
        {
          id: novoId,
          compra_id: Number(compraId),
          produto_id: Number(produtoId),
          quantidade: Number(quantidade),
          valor_unitario: Number(valorUnitario),
        },
      ]);
    }

    resetarFormulario();
  };

  const handleEditar = (item: Item) => {
    setEditandoId(item.id);
    setCompraId(String(item.compra_id));
    setProdutoId(String(item.produto_id));
    setQuantidade(String(item.quantidade));
    setValorUnitario(String(item.valor_unitario));
  };

  const handleExcluir = (id: number) => {
    if (customConfirm("Tem certeza que deseja excluir este item?")) {
      setItens(itens.filter((i) => i.id !== id));
    }
  };

  return (
    <div
      className="
        min-h-screen 
        p-4 sm:p-8 
        bg-cover bg-center bg-no-repeat
        max-sm:bg-none
      "
      style={{ backgroundImage: "url('/images/itens-img.png')" }}
    >
      <div className="container mx-auto max-w-6xl px-2 sm:px-0">

        <div className="mb-6 max-sm:flex max-sm:justify-center">
          <Link
            href="/admin/tipos"
            className="
              bg-[#9FC5B4] text-white px-4 py-2 
              rounded-lg hover:bg-[#8ab5a3] transition 
              flex items-center gap-2 w-fit
            "
          >
            <ArrowLeft size={18} />
            Voltar para Tipos
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-6 drop-shadow text-center sm:text-left">
          Gestão de Itens
        </h2>


        <div className="bg-[#D3F0E3] p-4 sm:p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-5 text-gray-800 text-center sm:text-left">
            {editandoId ? "Editar Item" : "Adicionar Item"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="ID da Compra"
              className="border p-3 rounded border-[#9FC5B4]"
              value={compraId}
              onChange={(e) => setCompraId(e.target.value)}
            />

            <input
              type="number"
              placeholder="ID do Produto"
              className="border p-3 rounded border-[#9FC5B4]"
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
            />

            <input
              type="number"
              placeholder="Quantidade"
              className="border p-3 rounded border-[#9FC5B4]"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />

            <input
              type="number"
              step="0.01"
              placeholder="Valor Unitário"
              className="border p-3 rounded border-[#9FC5B4]"
              value={valorUnitario}
              onChange={(e) => setValorUnitario(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6 max-sm:justify-center">
            {editandoId && (
              <button
                onClick={resetarFormulario}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
            )}

            <button
              onClick={handleSalvar}
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
            >
              <PlusCircle size={18} />
              {editandoId ? "Salvar Alterações" : "Adicionar Item"}
            </button>
          </div>
        </div>

        {/* TABELA */}
        <div className="
          bg-[#D3F0E3] rounded-lg shadow-lg 
          overflow-x-auto 
          border border-[#9FC5B4]
        ">
          <table className="min-w-full divide-y divide-[#9FC5B4] text-sm">
            <thead className="bg-[#9FC5B4]">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase">
                  ID
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase">
                  Compra ID
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase">
                  Produto ID
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase">
                  Quantidade
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase">
                  Valor Unitário
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-white uppercase">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="bg-[#D3F0E3] divide-y divide-[#9FC5B4]">
              {itens.map((item) => (
                <tr key={item.id}>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{item.id}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{item.compra_id}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{item.produto_id}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{item.quantidade}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    R$ {item.valor_unitario.toFixed(2)}
                  </td>

                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEditar(item)}
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleExcluir(item.id)}
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
