import { Button } from './ui/button';
import { Card } from './ui/card';
import { MessageCircle, Users, Shield, Globe } from 'lucide-react';
import { ModernLogo } from './ui/ModernLogo';

interface WelcomeScreenProps {
  onStartChat: () => void;
}

export function WelcomeScreen({ onStartChat }: WelcomeScreenProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col max-w-md mx-auto">
      {/* Logo e Header */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="mb-8 relative">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
            <ModernLogo size={64} className="drop-shadow-lg" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Companheiro Digital
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8 px-4">
          Seu assistente especializado em serviços públicos brasileiros
        </p>

        {/* Recursos */}
        <div className="space-y-4 mb-8 w-full">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Sites Governamentais</h3>
                <p className="text-sm text-gray-600">Especialista em gov.br e portais públicos</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Áudio e Texto</h3>
                <p className="text-sm text-gray-600">Respostas em áudio para compartilhar</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border-purple-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Informações Oficiais</h3>
                <p className="text-sm text-gray-600">Baseado em fontes governamentais</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Botão de Iniciar */}
      <div className="p-6">
        <Button 
          onClick={onStartChat}
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Começar Conversa
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-3 px-4">
          Tire suas dúvidas sobre documentos, benefícios sociais, serviços públicos e muito mais!
        </p>
      </div>
    </div>
  );
}