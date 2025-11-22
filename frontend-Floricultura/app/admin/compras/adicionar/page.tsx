"use client";

import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

type Cliente = {
  id: number;
  nome: string;
};

export default function AdicionarCompra() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loadingClientes, setLoadingClientes] = useState(true);

  const [form, setForm] = useState({
    data: "",
    cliente_id: 0,
    itens: 0,
    valor_total: 0,
    status: "Pendente",
  });

  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function fetchClientes() {
      try {
        const res = await fetch("http://127.0.0.1:5000/clientes/");
        const data = await res.json();
        setClientes(data);
      } catch (err) {
        console.error("Erro ao carregar clientes:", err);
      } finally {
        setLoadingClientes(false);
      }
    }

    fetchClientes();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "itens" || name === "valor_total" ? Number(value) : value,
    }));
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/compras/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar compra");
      }

      setMensagem("Compra cadastrada com sucesso!");

      setForm({
        data: "",
        cliente_id: 0,
        itens: 0,
        valor_total: 0,
        status: "Pendente",
      });

      setTimeout(() => setMensagem(""), 3000);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao cadastrar compra.");
      setTimeout(() => setMensagem(""), 3000);
    }
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

        {mensagem && (
          <div className="bg-white p-3 rounded-md shadow mb-4 text-center font-semibold">
            {mensagem}
          </div>
        )}

        {/* FORMULÁRIO */}
        <form
          onSubmit={handleSalvar}
          className="bg-[#D3F0E3] p-6 rounded-lg shadow-lg bg-opacity-90 grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data da Compra
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cliente
            </label>

            {loadingClientes ? (
              <p className="text-gray-800">Carregando clientes...</p>
            ) : (
              <select
                name="cliente_id"
                value={form.cliente_id}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border border-[#9FC5B4]"
              >
                <option value="">Selecione...</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade de Itens
            </label>
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

          {/* Valor Total */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor Total (R$)
            </label>
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

          {/* Status */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
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
      </div>
    </div>
  );
}