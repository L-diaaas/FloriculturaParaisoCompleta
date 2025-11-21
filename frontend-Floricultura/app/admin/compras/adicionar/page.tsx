"use client";

import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

type Cliente = {
  id: number;
  nome: string;
};

type Compra = {
  id: number;
  data: string;
  cliente_id: number;
  itens: number;
  valor_total: number;
  status: string;
};

const mockClientes: Cliente[] = [
  { id: 1, nome: "Ana Silva" },
  { id: 2, nome: "Bruno Costa" },
  { id: 3, nome: "Carla Dias" },
];

export default function AdicionarCompra() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [form, setForm] = useState<Compra>({
    id: 0,
    data: "",
    cliente_id: 0,
    itens: 0,
    valor_total: 0,
    status: "Pendente",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "itens" || name === "valor_total" ? Number(value) : value,
    }));
  }

  function handleSalvar(e: React.FormEvent) {
    e.preventDefault();

    const novaCompra: Compra = {
      ...form,
      id: compras.length + 1,
    };

    setCompras((prev) => [...prev, novaCompra]);


    setForm({
      id: 0,
      data: "",
      cliente_id: 0,
      itens: 0,
      valor_total: 0,
      status: "Pendente",
    });
  }

  return (
    <div className="min-h-screen p-8 relative">

      <img
        src="/fundoCompras.jpg"
        alt="Fundo"
        className="absolute inset-0 w-full h-full object-cover object-top z-0"
      />
      <div className="absolute inset-0 bg-black opacity-40 z-[5]" />

      <div className="relative z-10 max-w-4xl mx-auto">

        <a
          href="/admin/compras"
          className="px-4 py-1 rounded-md bg-verdesaja text-white hover:bg-teal-900 transition-colors duration-150 shadow-md"
        >
          Voltar
        </a>

        <h2 className="text-3xl font-bold text-white mb-6 pt-4 flex justify-between items-center">
          Adicionar Compra
          <PlusCircle size={30} className="text-white" />
        </h2>


        <form
          onSubmit={handleSalvar}
          className="bg-[#D3F0E3] p-6 rounded-lg shadow-lg bg-opacity-90 grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data da Compra</label>
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-[#9FC5B4]"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <select
              name="cliente_id"
              value={form.cliente_id}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-[#9FC5B4]"
            >
              <option value="">Selecione...</option>
              {mockClientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade de Itens</label>
            <input
              type="number"
              name="itens"
              value={form.itens === 0 ? "" : form.itens}
              onChange={handleChange}
              required
              placeholder="Ex: 3"
              className="w-full p-3 rounded-md border border-[#9FC5B4]"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor Total (R$)</label>
            <input
              type="number"
              step="0.01"
              name="valor_total"
              value={form.valor_total === 0 ? "" : form.valor_total}
              onChange={handleChange}
              required
              placeholder="Ex: 150.50"
              className="w-full p-3 rounded-md border border-[#9FC5B4]"
            />
          </div>


          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-[#9FC5B4]"
            >
              <option value="Pendente">Pendente</option>
              <option value="Enviado">Enviado</option>
              <option value="Entregue">Entregue</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-md"
            >
              Salvar Compra
            </button>
          </div>
        </form>

        {compras.length > 0 && (
          <div className="mt-8 bg-[#D3F0E3] p-6 rounded-lg shadow-lg bg-opacity-90">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Compras Cadastradas</h3>

            <ul className="space-y-3 text-gray-800">
              {compras.map((c) => (
                <li key={c.id} className="p-3 bg-white rounded shadow border">
                  <p><strong>ID:</strong> {c.id}</p>
                  <p><strong>Data:</strong> {c.data}</p>
                  <p><strong>Cliente:</strong> {mockClientes.find(cl => cl.id === c.cliente_id)?.nome}</p>
                  <p><strong>Itens:</strong> {c.itens}</p>
                  <p><strong>Total:</strong> R$ {c.valor_total.toFixed(2)}</p>
                  <p><strong>Status:</strong> {c.status}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
