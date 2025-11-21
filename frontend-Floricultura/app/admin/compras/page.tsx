"use client";

import React, { useState } from "react";
import { DollarSign, Truck, CheckCircle, Pencil, Trash2 } from "lucide-react"; 
import Image from 'next/image'; 


type Pedido = {
  id: number;
  dataCompra: string;
  clienteId: number; 
  itens: number;
  total: number;
  status: 'Pendente' | 'Enviado' | 'Entregue';
};

type Cliente = {
    id: number;
    nome: string;
    rg: string;
    telefone: string;
    endereco: string;
};

const statusOpcoes = ['Pendente', 'Enviado', 'Entregue'];

const mockClientes: Cliente[] = [
    { id: 1, nome: "Ana Silva", rg: "12.345.678-9", telefone: "(11) 98765-4321", endereco: "Rua das Flores, 123" },
    { id: 2, nome: "Bruno Costa", rg: "98.765.432-1", telefone: "(21) 91234-5678", endereco: "Avenida Central, 456" },
    { id: 3, nome: "Carla Dias", rg: "11.222.333-4", telefone: "(51) 99999-8888", endereco: "Praça da Matriz, 789" },
];

const initialPedidos: Pedido[] = [
  { id: 101, dataCompra: "15/11/2025", clienteId: 1, itens: 3, total: 150.00, status: 'Enviado' },
  { id: 102, dataCompra: "13/11/2025", clienteId: 2, itens: 1, total: 55.50, status: 'Pendente' },
  { id: 103, dataCompra: "10/11/2025", clienteId: 3, itens: 5, total: 280.90, status: 'Entregue' },
];

const emptyPedido: Pedido = { 
    id: 0, 
    dataCompra: '', 
    clienteId: 0, 
    itens: 0, 
    total: 0, 
    status: 'Pendente' 
};

export default function PaginaPedidos() {

  const [pedidos, setPedidos] = useState<Pedido[]>(initialPedidos);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [pedidoEmEdicao, setPedidoEmEdicao] = useState<Pedido>(emptyPedido);

  const COR_FUNDO = "bg-[#D3F0E3]";
  const COR_BORDA_CABECALHO = "bg-[#9FC5B4]";
  const COR_DIVISORIA = "divide-[#9FC5B4]";
  const COR_PRINCIPAL = "bg-emerald-600";
  const COR_PRINCIPAL_HOVER = "hover:bg-emerald-700";

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const getClienteNome = (id: number): string => {
      const cliente = mockClientes.find(c => c.id === id);
      return cliente ? cliente.nome : `ID Desconhecido`;
  };

  const handleAtualizar = (id: number) => {
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) {
      setPedidoEmEdicao(pedido);
      setEditandoId(id);
    }
  };

  const handleExcluir = (id: number) => {
    if (window.confirm(`Tem certeza que deseja excluir o Pedido ${id}?`)) {
      setPedidos(pedidos.filter(p => p.id !== id));
      setEditandoId(null);
    }
  };

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    
    setPedidos(pedidos.map(p => 
      p.id === pedidoEmEdicao.id ? pedidoEmEdicao : p
    ));
    
    setEditandoId(null);
    setPedidoEmEdicao(emptyPedido);
  };
  
  const handleCancelar = () => {
    setEditandoId(null);
    setPedidoEmEdicao(emptyPedido);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let newValue: string | number = value;
    if (name === 'itens' || name === 'total') {
        newValue = Number(value);
    }

    setPedidoEmEdicao(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative">

      <img
        src="/fundoCompras.jpg"
        alt="Fundo de flores"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-top z-0 hidden md:block"
      />

      <div className="absolute inset-0 bg-black opacity-40 z-[5] hidden md:block"></div>

      <div className="container mx-auto max-w-6xl relative z-10">

        <a
            href="/admin/"
            className="px-4 py-1 rounded-md bg-verdesaja text-white hover:bg-teal-900 transition-colors duration-150 shadow-md"
        >
            Voltar
        </a> 

        <h2 className="text-xl md:text-2xl font-semibold text-white md:text-white mb-6 pt-4">
          Gestão de Compras
        </h2>

        <div className="flex flex-col md:flex-row justify-end items-start md:items-end gap-3 mb-6">
          <a
              href="/admin/compras/adicionar"
              className="px-5 py-2 rounded-md bg-teal-900 text-white hover:bg-verdepastel transition duration-150 shadow-md text-sm md:text-base"
          >
              + Adicionar Compra
          </a>
        </div>

        {editandoId !== null && (
          <div className={`${COR_FUNDO} p-6 rounded-lg shadow-lg mb-8 bg-opacity-90`}>
            <h3 className="text-xl font-semibold mb-5 text-gray-700">
              Editar Pedido {pedidoEmEdicao.id}
            </h3>

            <form onSubmit={handleSalvar} className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Data da Compra</label>
                <input
                  type="text"
                  name="dataCompra"
                  value={pedidoEmEdicao.dataCompra}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#9FC5B4]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">ID do Cliente</label>
                <input
                  type="text"
                  disabled 
                  name="clienteId"
                  value={pedidoEmEdicao.clienteId}
                  className="w-full p-3 rounded-md border border-[#9FC5B4] bg-gray-200 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Número de Itens</label>
                <input
                  type="number"
                  name="itens"
                  value={pedidoEmEdicao.itens === 0 ? '' : pedidoEmEdicao.itens}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#9FC5B4]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Total (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="total"
                  value={pedidoEmEdicao.total === 0 ? '' : pedidoEmEdicao.total}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-[#9FC5B4]"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                    name="status"
                    value={pedidoEmEdicao.status}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-[#9FC5B4]"
                    required
                >
                    {statusOpcoes.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col md:flex-row justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCancelar}
                  className="px-6 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className={`px-6 py-2 rounded-md ${COR_PRINCIPAL} text-white ${COR_PRINCIPAL_HOVER} flex items-center`}
                >
                  <Pencil size={18} className="mr-2" /> Salvar Alterações
                </button>
              </div>

            </form>
          </div>
        )}


        <div className="overflow-x-auto">
          <div className={`${COR_FUNDO} rounded-lg shadow-lg border border-[#9FC5B4] bg-opacity-90`}>
            <table className={`min-w-full divide-y ${COR_DIVISORIA}`}>

              <thead className={`${COR_BORDA_CABECALHO}`}>
                <tr>
                  <th className="px-2 md:px-6 py-3 text-left text-[10px] md:text-xs text-white uppercase tracking-wider">COMPRA ID</th>
                  <th className="px-2 md:px-6 py-3 text-left text-[10px] md:text-xs text-white uppercase tracking-wider">DATA</th>
                  <th className="px-2 md:px-6 py-3 text-left text-[10px] md:text-xs text-white uppercase tracking-wider">CLIENTE ID</th>
                  <th className="px-2 md:px-6 py-3 text-left text-[10px] md:text-xs text-white uppercase tracking-wider">CLIENTE</th>
                  <th className="px-2 md:px-6 py-3 text-left text-[10px] md:text-xs text-white uppercase tracking-wider">ITENS</th>
                  <th className="px-2 md:px-6 py-3 text-left text-[10px] md:text-xs text-white uppercase tracking-wider">TOTAL</th>
                  <th className="px-2 md:px-6 py-3 text-left text-[10px] md:text-xs text-white uppercase tracking-wider">STATUS</th>
                  <th className="px-2 md:px-6 py-3 text-center text-[10px] md:text-xs text-white uppercase tracking-wider">AÇÕES</th>
                </tr>
              </thead>

              <tbody className={`${COR_FUNDO} divide-y ${COR_DIVISORIA}`}>
                {pedidos.map((pedido) => (
                  <tr 
                    key={pedido.id}
                    onClick={() => handleAtualizar(pedido.id)}
                    className="cursor-pointer hover:bg-opacity-80"
                  >

                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-[11px] md:text-sm font-medium text-gray-900">{pedido.id}</td>
                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-[11px] md:text-sm text-gray-700">{pedido.dataCompra}</td>
                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-[11px] md:text-sm font-medium text-gray-900">{pedido.clienteId}</td>
                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-[11px] md:text-sm text-gray-700">
                      {getClienteNome(pedido.clienteId)}
                    </td>

                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-[11px] md:text-sm text-center">{pedido.itens}</td>

                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-[11px] md:text-sm font-semibold text-gray-900">
                      {formatCurrency(pedido.total)}
                    </td>

                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-[11px] md:text-sm">
                      <span className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold ${
                        pedido.status === 'Entregue'
                          ? 'bg-green-100 text-green-800'
                          : pedido.status === 'Enviado'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pedido.status === 'Entregue' && <CheckCircle size={14} className="mr-1" />}
                        {pedido.status === 'Enviado' && <Truck size={14} className="mr-1" />}
                        {pedido.status === 'Pendente' && <DollarSign size={14} className="mr-1" />}
                        {pedido.status}
                      </span>
                    </td>

                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-center text-[11px] md:text-sm flex justify-center gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAtualizar(pedido.id); }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button 
                        onClick={(e) => { e.stopPropagation(); handleExcluir(pedido.id); }}
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
    </div>
  );
}
