"use client";

import { useEffect, useState } from "react";
import { KitchenTicket, Order } from "@/types";
import { apiGet, apiPatch } from "@/lib/api";
import Link from "next/link";
import { Clock, Play, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";

export default function KDSPage() {
  const [tickets, setTickets] = useState<KitchenTicket[]>([]);
  const [orders, setOrders] = useState<Map<string, Order>>(new Map());
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("WAITING");

  // Buscar pedidos e tickets continuamente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsData = await apiGet<KitchenTicket[]>("/api/kds/orders");
        setTickets(ticketsData);

        // Buscar detalhes dos pedidos
        const ordersMap = new Map<string, Order>();
        for (const ticket of ticketsData) {
          try {
            const orderData = await apiGet<Order>(
              `/api/orders/${ticket.orderId}`,
            );
            ordersMap.set(ticket.orderId, orderData);
          } catch (error) {
            console.error(`Erro ao buscar pedido ${ticket.orderId}:`, error);
          }
        }
        setOrders(ordersMap);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar KDS:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Polling a cada 5 segundos
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    try {
      const endpoint =
        newStatus === "IN_PREPARATION"
          ? `/api/kds/orders/${ticketId}/start`
          : newStatus === "READY"
            ? `/api/kds/orders/${ticketId}/ready`
            : `/api/kds/orders/${ticketId}/delivered`;

      await apiPatch(endpoint);

      // Atualizar estado local
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket,
        ),
      );
    } catch (error) {
      console.error("Erro ao atualizar ticket:", error);
    }
  };

  const waitingTickets = tickets.filter((t) => t.status === "WAITING");
  const inProgressTickets = tickets.filter(
    (t) => t.status === "IN_PREPARATION",
  );
  const readyTickets = tickets.filter((t) => t.status === "READY");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "WAITING":
        return "bg-apple-blue";
      case "IN_PREPARATION":
        return "bg-apple-orange";
      case "READY":
        return "bg-apple-green";
      default:
        return "bg-apple-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "WAITING":
        return <Clock className="w-5 h-5" />;
      case "IN_PREPARATION":
        return <Play className="w-5 h-5" />;
      case "READY":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-apple-black text-apple-white">
      {/* Header */}
      <div className="bg-apple-gray-800 border-b border-apple-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/admin">
            <ArrowLeft className="w-6 h-6 hover:opacity-75 transition-opacity cursor-pointer" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">KDS - COZINHA</h1>
            <p className="text-apple-gray-400">Sistema de Pedidos</p>
          </div>
        </div>
      </div>

      {/* KDS Board */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p>Carregando pedidos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Waiting Column */}
            <div className="bg-apple-gray-800 rounded-2xl p-4 border border-apple-blue border-opacity-50">
              <h2 className="font-bold text-lg mb-4 text-apple-blue">
                NA FILA ({waitingTickets.length})
              </h2>
              <div className="space-y-3">
                {waitingTickets.map((ticket) => (
                  <KDSCard
                    key={ticket.id}
                    ticket={ticket}
                    order={orders.get(ticket.orderId)}
                    onStatusChange={() =>
                      handleStatusChange(ticket.id, "IN_PREPARATION")
                    }
                  />
                ))}
                {waitingTickets.length === 0 && (
                  <p className="text-apple-gray-400 text-center py-8">
                    Nenhum pedido na fila
                  </p>
                )}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="bg-apple-gray-800 rounded-2xl p-4 border border-apple-orange border-opacity-50">
              <h2 className="font-bold text-lg mb-4 text-apple-orange">
                EM PREPARO ({inProgressTickets.length})
              </h2>
              <div className="space-y-3">
                {inProgressTickets.map((ticket) => (
                  <KDSCard
                    key={ticket.id}
                    ticket={ticket}
                    order={orders.get(ticket.orderId)}
                    onStatusChange={() =>
                      handleStatusChange(ticket.id, "READY")
                    }
                  />
                ))}
                {inProgressTickets.length === 0 && (
                  <p className="text-apple-gray-400 text-center py-8">
                    Nenhum pedido em preparo
                  </p>
                )}
              </div>
            </div>

            {/* Ready Column */}
            <div className="bg-apple-gray-800 rounded-2xl p-4 border border-apple-green border-opacity-50">
              <h2 className="font-bold text-lg mb-4 text-apple-green">
                PRONTO ({readyTickets.length})
              </h2>
              <div className="space-y-3">
                {readyTickets.map((ticket) => (
                  <KDSCard
                    key={ticket.id}
                    ticket={ticket}
                    order={orders.get(ticket.orderId)}
                    onStatusChange={() =>
                      handleStatusChange(ticket.id, "DELIVERED")
                    }
                  />
                ))}
                {readyTickets.length === 0 && (
                  <p className="text-apple-gray-400 text-center py-8">
                    Nenhum pedido pronto
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface KDSCardProps {
  ticket: KitchenTicket;
  order?: Order;
  onStatusChange: () => void;
}

function KDSCard({ ticket, order, onStatusChange }: KDSCardProps) {
  const createdTime = ticket.createdAt
    ? new Date(ticket.createdAt).toLocaleTimeString()
    : "--:--";
  const status = ticket.status;

  const getButtonText = () => {
    switch (status) {
      case "WAITING":
        return "Iniciar";
      case "IN_PREPARATION":
        return "Marcar Pronto";
      case "READY":
        return "Entregue";
      default:
        return "Ação";
    }
  };

  return (
    <div className="bg-apple-gray-700 rounded-lg p-4 border border-apple-gray-600">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-2xl">
          #{order?.orderNumber || "N/A"}
        </span>
        <span className="text-xs text-apple-gray-400">{createdTime}</span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-apple-gray-400 mb-2">Itens:</p>
        <div className="bg-apple-gray-600 rounded p-2">
          <p className="text-sm">• Pedido #{ticket.orderId.slice(0, 8)}</p>
        </div>
      </div>

      <button
        onClick={onStatusChange}
        className="w-full bg-apple-orange text-apple-black font-bold py-2 rounded hover:opacity-90 transition-opacity"
      >
        {getButtonText()}
      </button>
    </div>
  );
}
