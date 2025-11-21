"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Card from "../components/Card";

export default function AdminHome() {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/produtos/")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error("Erro ao carregar produtos:", error));
  }, [router]);

  const cards = [
    { title: "Produtos", subtitle: "Quantidade", icon: "/images/produtos.png", color: "#D3F0E3", link:"/admin/produtos"},
    { title: "Tipos", subtitle: "Nomes", icon: "/images/tipos.png", color: "#77CBBD", link:"/admin/tipos" },
    { title: "Clientes", subtitle: "Dados", icon: "/images/clientes.png", color: "#A5D9C1", link:"/admin/clientes" },
    { title: "Compras", subtitle: "Dados", icon: "/images/compras.png", color: "#B0E2D6", link:"/admin/compras" },
  ];

  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(search.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <main className="flex bg-[#F8FFFC] min-h-screen relative">


        <div className="hidden md:block">
          <Sidebar />
        </div>

  
        <div className="flex-1 p-6 md:p-10 bg-white min-h-screen md:ml-64">

          <img
            src="/images/decorativa.png"
            alt="Decorativa"
            className="hidden md:block absolute top-0 right-0 md:w-130 opacity-50 pointer-events-none"
          />

          <Header search={search} setSearch={setSearch} />


          <div className="bg-[#E6F4EF] p-6 md:p-10 rounded-3xl shadow-md max-w-4xl mx-auto mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
              {filteredCards.map((card, index) =>
                card.link ? (
                  <Link key={index} href={card.link}>
                    <Card {...card} />
                  </Link>
                ) : (
                  <Card key={index} {...card} />
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
