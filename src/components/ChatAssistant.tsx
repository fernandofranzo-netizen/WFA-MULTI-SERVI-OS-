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
      text: 'Olá! Sou o assistente virtual da WFA MultiServiços 🔧\n\nPosso tirar dúvidas sobre nossos serviços de Elétrica, Mecânica, Hidráulica, Solda e Alvenaria, ou ajudar a agendar uma visita técnica no seu endereço. Como posso te ajudar hoje?',
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
    '🚨 Emergência com disjuntor caindo',
    '💧 Vazamento ou cano furado',
    '🚪 Solda e conserto de portão',
    '🧱 Reforma de piso e alvenaria',
    '⏱️ Como funciona a visita técnica WFA?',
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
        text: data.reply || 'Entendido! Recomendo que você nos envie uma foto ou mensagem no WhatsApp para combinarmos a visita técnica.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const botFallback: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'A WFA atende prontamente serviços de Elétrica, Mecânica, Hidráulica, Soldagem e Alvenaria com garantia formal e pontualidade. Se preferir atendimento imediato, clique no botão do WhatsApp abaixo para agendar sua visita técnica com a equipe WFA!',
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
      `Olá WFA MultiServiços! Estava conversando com seu assistente no site sobre: "${recentQueries || 'agendamento de visita técnica'}" e gostaria de continuar o atendimento por aqui.`
    );
    window.open(`https://wa.me/5584996737378?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-slate-950 font-black text-sm shadow-2xl shadow-orange-500/40 border-2 border-blue-400/30 transition-all hover:scale-105 cursor-pointer"
        >
          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-slate-950 border border-slate-700 shrink-0">
            <img
              src="/assets/aistudio/IMG-20261106-WA0193_9a0aed0a.jpg"
              alt="Logo WFA"
              className="w-full h-full object-contain"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950" />
          </div>
          <span>Dúvidas WFA</span>
          <span className="hidden sm:inline text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-950/20 text-slate-950">
            IA 24h
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-96 h-[500px] max-h-[85vh] rounded-3xl bg-slate-900 border-2 border-blue-500/40 shadow-2xl shadow-black/80 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-950 border border-orange-500/40 p-0.5 shadow-md flex items-center justify-center shrink-0">
                <img
                  src="/assets/aistudio/IMG-20261106-WA0193_9a0aed0a.jpg"
                  alt="WFA Assistente"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black text-white">Assistente WFA</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-blue-400 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-orange-400" />
                  WFA MultiServiços 24h
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
            <span className="text-emerald-300">Prefere falar direto pelo WhatsApp?</span>
            <button
              onClick={handleWhatsAppHandoff}
              className="font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 underline cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" /> Falar com a WFA
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
