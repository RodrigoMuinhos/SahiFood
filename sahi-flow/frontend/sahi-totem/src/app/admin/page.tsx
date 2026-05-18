import Link from "next/link";
import { ArrowLeft, BarChart3, ChefHat } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-apple-black text-apple-white">
      {/* Header */}
      <div className="bg-apple-gray-800 border-b border-apple-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/menu">
            <ArrowLeft className="w-6 h-6 hover:opacity-75 transition-opacity cursor-pointer" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">ADM</h1>
            <p className="text-apple-gray-400">Acesso interno do SA'HI</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-3">Selecione o ambiente</h2>
          <p className="text-apple-gray-300 max-w-2xl">
            O atendimento do cliente fica direto no cardápio. Aqui dentro do ADM
            ficam apenas os acessos operacionais e gerenciais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/gestao">
            <div className="bg-apple-gray-800 rounded-2xl p-8 border border-apple-gray-700 hover:border-apple-blue hover:bg-apple-gray-700 transition-colors cursor-pointer h-full">
              <BarChart3 className="w-14 h-14 text-apple-blue mb-4" />
              <h3 className="text-2xl font-bold mb-2">Gestão</h3>
              <p className="text-apple-gray-400 mb-6">
                Veja pedidos, vendas e ticket médio em um painel consolidado.
              </p>
              <span className="inline-flex px-5 py-2 rounded-lg bg-apple-blue text-apple-white font-semibold">
                Abrir dashboard
              </span>
            </div>
          </Link>

          <Link href="/kds">
            <div className="bg-apple-gray-800 rounded-2xl p-8 border border-apple-gray-700 hover:border-apple-green hover:bg-apple-gray-700 transition-colors cursor-pointer h-full">
              <ChefHat className="w-14 h-14 text-apple-green mb-4" />
              <h3 className="text-2xl font-bold mb-2">KDS</h3>
              <p className="text-apple-gray-400 mb-6">
                Acompanhe a fila da cozinha e avance os pedidos por status.
              </p>
              <span className="inline-flex px-5 py-2 rounded-lg bg-apple-green text-apple-black font-semibold">
                Abrir cozinha
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-apple-gray-700 bg-apple-gray-800 p-5 text-sm text-apple-gray-400">
          Dica: a home pública do SA'HI agora abre direto no cardápio do
          cliente.
        </div>
      </div>
    </div>
  );
}
