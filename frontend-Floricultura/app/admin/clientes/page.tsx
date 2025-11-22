"use client";

import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type Cliente = {
  id: number;
  nome: string;
  rg: string;
  telefone: string;
  endereco: string;
};

export default function PaginaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nome, setNome] = useState("");
  const [rg, setRg] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const API_URL = "http://localhost:5000/clientes";

  // --------------------------------------------
  // Carregar clientes ao abrir página
  // --------------------------------------------
  useEffect(() => {
    fetch(API_URL + "/")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Erro ao carregar clientes:", err));
  }, []);

  const customConfirm = (message: string): boolean => {
    console.log(`Ação de Confirmação: ${message}`);
    return true;
  };

  // --------------------------------------------
  // Criar ou atualizar cliente
  // --------------------------------------------
  const handleSalvar = async () => {
    const payload = { nome, rg, telefone, endereco };

    try {
      if (editandoId !== null) {
        // PUT
        const res = await fetch(`${API_URL}/${editandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error ?? "Erro ao atualizar");
          return;
        }

        setClientes(clientes.map((c) => (c.id === editandoId ? data : c)));
      } else {
        // POST
        const res = await fetch(API_URL + "/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error ?? "Erro ao criar cliente");
          return;
        }

        // POST retorna [obj], então pegamos data[0]
        setClientes([...clientes, data[0]]);
      }

      resetarFormulario();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

  // --------------------------------------------
  // Preencher formulário para edição
  // --------------------------------------------
  const handleEditar = (cliente: Cliente) => {
    setEditandoId(cliente.id);
    setNome(cliente.nome);
    setRg(cliente.rg);
    setTelefone(cliente.telefone);
    setEndereco(cliente.endereco);
  };

  // --------------------------------------------
  // Excluir cliente
  // --------------------------------------------
  const handleExcluir = async (id: number) => {
    if (!customConfirm("Tem certeza que deseja excluir este cliente?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    setClientes(clientes.filter((c) => c.id !== id));
  };

  const resetarFormulario = () => {
    setEditandoId(null);
    setNome("");
    setRg("");
    setTelefone("");
    setEndereco("");
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fundoCliente.jpg')" }}
    >
      <div className="container mx-auto max-w-5xl">
        <a
          href="/admin/"
          className="px-4 py-2 rounded-md bg-verdesaja text-white hover:bg-teal-900 transition-colors duration-150 shadow-md text-sm md:text-base"
        >
          Voltar
        </a>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 pt-4 text-center md:text-left">
          Gestão de Clientes
        </h2>

        <div className="bg-[#D3F0E3] p-4 md:p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-lg md:text-xl font-semibold mb-5 text-gray-800 text-center md:text-left">
            {editandoId ? "Editar Cliente" : "Adicionar Novo Cliente"}
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Nome Completo"
              className="border p-3 rounded w-full border-[#9FC5B4] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="text"
              placeholder="RG (ex: 12.345.678-9)"
              className="border p-3 rounded w-full border-[#9FC5B4] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={rg}
              onChange={(e) => setRg(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Telefone (ex: (11) 99999-8888)"
              className="border p-3 rounded w-full border-[#9FC5B4] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Endereço Completo"
              className="border p-3 rounded w-full border-[#9FC5B4] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-end gap-3 mt-6">
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
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 justify-center"
            >
              <PlusCircle size={18} />
              {editandoId ? "Salvar Alterações" : "Adicionar Cliente"}
            </button>
          </div>
        </div>

        <div className="bg-[#D3F0E3] rounded-lg shadow-lg overflow-x-auto border border-[#9FC5B4]">
          <table className="min-w-full divide-y divide-[#9FC5B4]">
            <thead className="bg-[#9FC5B4]">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  RG
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  Telefone
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  Endereço
                </th>
                <th className="px-4 md:px-6 py-3 text-right text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="bg-[#D3F0E3] divide-y divide-[#9FC5B4]">
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">
                    {cliente.nome}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                    {cliente.rg}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                    {cliente.telefone}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                    {cliente.endereco}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button
                      onClick={() => handleEditar(cliente)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleExcluir(cliente.id)}
                      className="text-red-600 hover:text-red-800"
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