import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ShieldCheck,
  ChevronDown,
  Minimize2
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Olá! Sou o assistente virtual da WFA METAIS (Serralheria em Geral) 🔧\n\nPosso tirar dúvidas sobre Grades, Portões, Estruturas Metálicas, Soldas em Geral e Serviços Personalizados de Wellington Silva Nascimento, ou te ajudar a solicitar um orçamento no WhatsApp. Como posso te ajudar hoje?',
      timestamp: 'Agora',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    '🚪 Orçamento de Portão Basculante',
    '🛡️ Grades de Proteção para Casa',
    '🏗️ Estrutura Metálica e Mezanino',
    '🔥 Solda e Reparo de Ferragens',
    '💬 Falar com Wellington no WhatsApp',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do assistente');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'Entendido! Recomendo que você nos envie as medidas ou fotos no WhatsApp para fazermos seu orçamento sem compromisso.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const botFallback: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'A WFA METAIS é especializada em Grades, Portões, Estruturas Metálicas, Soldas em Geral e Serviços Personalizados, liderada por Wellington Silva Nascimento. Para solicitar seu orçamento imediato, clique no botão do WhatsApp abaixo!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botFallback]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppHandoff = () => {
    const recentQueries = messages
      .filter((m) => m.sender === 'user')
      .slice(-2)
      .map((m) => m.text)
      .join(' | ');

    const text = encodeURIComponent(
      `Olá WFA Metais! Estava no site tirando dúvidas sobre "${recentQueries || 'solicitação de orçamento'}" e gostaria de continuar o atendimento com Wellington Silva Nascimento.`
    );
    window.open(`https://wa.me/558499637378?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-slate-950 font-black text-sm shadow-2xl shadow-orange-500/40 border-2 border-blue-400/30 transition-all hover:scale-105 cursor-pointer"
        >
          <div className="relative h-7 rounded-lg overflow-hidden bg-slate-950 border border-slate-700 shrink-0 px-1 flex items-center justify-center">
            <img
              src="/assets/aistudio/image_dc0dbf4b.png"
              alt="Logotipo WFA Metais"
              className="h-full w-auto object-contain"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950" />
          </div>
          <span>Dúvidas WFA Metais</span>
          <span className="hidden sm:inline text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-950/20 text-slate-950">
            Online
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-96 h-[500px] max-h-[85vh] rounded-3xl bg-slate-900 border-2 border-blue-500/40 shadow-2xl shadow-black/80 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 rounded-xl overflow-hidden bg-slate-950 border border-orange-500/40 p-1 shadow-md flex items-center justify-center shrink-0 px-1.5">
                <img
                  src="/assets/aistudio/image_dc0dbf4b.png"
                  alt="Logotipo WFA Metais"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black text-white">Assistente WFA Metais</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-orange-400" />
                  Wellington Silva Nascimento
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-900/90 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3 leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs pl-2">
                <Bot className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>O assistente está digitando...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply suggestions */}
          <div className="p-2 bg-slate-950/80 border-t border-slate-800 overflow-x-auto whitespace-nowrap space-x-1.5 scrollbar-thin">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="inline-block text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-slate-700 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* WhatsApp Direct Handoff banner */}
          <div className="px-3 py-1.5 bg-emerald-950/40 border-t border-emerald-900/40 flex items-center justify-between text-[11px]">
            <span className="text-emerald-300">Deseja atendimento direto no WhatsApp?</span>
            <button
              onClick={handleWhatsAppHandoff}
              className="font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 underline cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" /> Falar com Wellington
            </button>
          </div>

          {/* Input field */}
          <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Digite sua dúvida sobre o serviço..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
