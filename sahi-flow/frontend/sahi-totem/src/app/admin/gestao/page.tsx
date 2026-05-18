"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types";
import { apiGet } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GestaoPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    avgTicket: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await apiGet<Order[]>("/api/orders");
        setOrders(ordersData);

        const total = ordersData.reduce((sum, order) => sum + order.total, 0);
        setStats({
          totalOrders: ordersData.length,
          totalSales: total,
          avgTicket: ordersData.length > 0 ? total / ordersData.length : 0,
        });
      } catch (error) {
        console.error("Erro ao carregar gestão:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-apple-black text-apple-white">
      <div className="bg-apple-gray-800 border-b border-apple-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/admin">
            <ArrowLeft className="w-6 h-6 hover:opacity-75 transition-opacity cursor-pointer" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">GESTÃO</h1>
            <p className="text-apple-gray-400">Dashboard Administrativo</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-apple-gray-800 rounded-2xl p-6 border border-apple-blue border-opacity-50">
            <p className="text-apple-gray-400 text-sm mb-2">Total de Pedidos</p>
            <p className="text-4xl font-bold text-apple-blue">
              {stats.totalOrders}
            </p>
          </div>

          <div className="bg-apple-gray-800 rounded-2xl p-6 border border-apple-green border-opacity-50">
            <p className="text-apple-gray-400 text-sm mb-2">Total de Vendas</p>
            <p className="text-4xl font-bold text-apple-green">
              R$ {stats.totalSales.toFixed(2)}
            </p>
          </div>

          <div className="bg-apple-gray-800 rounded-2xl p-6 border border-apple-orange border-opacity-50">
            <p className="text-apple-gray-400 text-sm mb-2">Ticket Médio</p>
            <p className="text-4xl font-bold text-apple-orange">
              R$ {stats.avgTicket.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-apple-gray-800 rounded-2xl border border-apple-gray-700 overflow-hidden">
          <div className="p-6 border-b border-apple-gray-700">
            <h2 className="text-xl font-bold">Pedidos Recentes</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center">Carregando...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-apple-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">Pedido</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-right">Total</th>
                    <th className="px-6 py-3 text-left">Data/Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map((order) => (
                    <tr
                      key={order.id}
                      className="border-t border-apple-gray-700 hover:bg-apple-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold">
                        #{order.orderNumber}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                            order.status === "PAID"
                              ? "bg-apple-green text-apple-black"
                              : "bg-apple-gray-600 text-apple-gray-300"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-apple-orange">
                        R$ {order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-apple-gray-400">
                        {new Date(order.createdAt).toLocaleString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {orders.length === 0 && (
                <div className="p-6 text-center text-apple-gray-400">
                  Nenhum pedido encontrado
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
