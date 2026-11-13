import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Share2, 
  Check, 
  ArrowRight, 
  Tag, 
  Eye, 
  X,
  MessageCircle,
  Linkedin,
  Facebook,
  Twitter
} from 'lucide-react';
import { OfficialWhatsAppLogo } from './OfficialSocialIcons';
import { BlogPost, ServiceCategory } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  onOpenLeadModal: (service?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  onOpenLeadModal,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = (network: 'whatsapp' | 'facebook' | 'twitter' | 'linkedin' | 'copy', post: BlogPost) => {
    const url = window.location.href;
    const title = post.title;

    if (network === 'whatsapp') {
      const shareText = encodeURIComponent(`Confira essa dica técnica de ${post.categoryLabel}: "${title}"\n${url}`);
      window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
    } else if (network === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (network === 'twitter') {
      const tweet = encodeURIComponent(`Dica técnica profissional: ${title}`);
      window.open(`https://twitter.com/intent/tweet?text=${tweet}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (network === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (network === 'copy') {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section id="blog" className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-orange-400" />
            WFA Metais • Serralheria & Dicas Técnicas
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Blog & Dicas do Especialista
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Artigos e orientações técnicas de Wellington Silva Nascimento e equipe WFA para conservação de portões, grades, estruturas metálicas e manutenções em geral.
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer hover:border-slate-700 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 border border-slate-700 uppercase">
                    {post.categoryLabel}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center text-[11px] text-slate-500 gap-2 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:underline">
                  Ler artigo <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {post.views}
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full article reader modal with social sharing */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold uppercase">
                {selectedPost.categoryLabel}
              </span>
              <span className="text-xs text-slate-400">• {selectedPost.readTime} de leitura</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              {selectedPost.title}
            </h2>

            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-800 text-xs text-slate-400 mb-6">
              <div>
                Por <strong className="text-slate-200">{selectedPost.author}</strong> em {selectedPost.date}
              </div>

              {/* Social sharing bar */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5" /> Compartilhar:
                </span>
                <button
                  onClick={() => handleShare('whatsapp', selectedPost)}
                  title="Compartilhar no WhatsApp"
                  className="p-1.5 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                >
                  <OfficialWhatsAppLogo className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('facebook', selectedPost)}
                  title="Compartilhar no Facebook"
                  className="p-1.5 rounded-lg bg-blue-600/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('twitter', selectedPost)}
                  title="Compartilhar no Twitter/X"
                  className="p-1.5 rounded-lg bg-sky-600/30 text-sky-400 hover:bg-sky-600 hover:text-white transition-all cursor-pointer"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin', selectedPost)}
                  title="Compartilhar no LinkedIn"
                  className="p-1.5 rounded-lg bg-blue-700/30 text-blue-300 hover:bg-blue-700 hover:text-white transition-all cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy', selectedPost)}
                  title="Copiar Link"
                  className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400 inline mr-1" /> : null}
                  {copiedLink ? 'Copiado!' : 'Copiar Link'}
                </button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden mb-6 h-64 bg-slate-950">
              <img
                src={selectedPost.coverImageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article content */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line mb-8">
              {selectedPost.content}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {selectedPost.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-400"
                >
                  <Tag className="w-3 h-3 text-amber-400" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Author box & Call to action */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-white font-bold text-sm">
                  Precisa de um projeto sob medida ou reparo profissional?
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Fale com Wellington Silva Nascimento e equipe WFA Metais. Qualidade, resistência e compromisso com você!
                </p>
              </div>
              <a
                href="https://wa.me/5584996737378?text=Ol%C3%A1%20WFA%20Metais!%20Li%20o%20artigo%20no%20blog%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-black text-xs shrink-0 cursor-pointer shadow-lg shadow-emerald-950/40"
              >
                <OfficialWhatsAppLogo className="w-4 h-4" />
                Solicitar Orçamento no WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
