import React from 'react';
import { X, Check, Copy, ExternalLink, Zap, Shield, Globe } from 'lucide-react';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyNotice: (msg: string) => void;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({
  isOpen,
  onClose,
  onCopyNotice,
}) => {
  if (!isOpen) return null;

  const vercelJsonSnippet = `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`;

  const copyConfig = () => {
    navigator.clipboard.writeText(vercelJsonSnippet);
    onCopyNotice('vercel.json configuration copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#faf9f6] text-stone-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold">
              ▲
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">Deploying to Vercel (100% Free)</h3>
              <p className="text-xs text-stone-500">Zero configuration · Instant static loading · Global CDN</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-700">
          <div className="bg-amber-50/80 border border-amber-200/80 p-4 rounded-xl text-amber-900 space-y-1">
            <div className="font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              Ultra-Fast Static Website Ready for Vercel
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              This blog compiles directly into pure, minified HTML, CSS, and client-side JavaScript inside the <code>dist/</code> folder. It has zero server overhead and loads in under 0.4 seconds globally.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <h4 className="font-bold text-stone-900 text-base">Simple 3-Step Free Deployment:</h4>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-semibold text-stone-900">Push to GitHub or GitLab</div>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Create a free GitHub repository and push your project files.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-semibold text-stone-900">Import in Vercel Dashboard</div>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Go to <strong>vercel.com</strong>, log in with GitHub, and click <strong>"Add New Project"</strong>. Vercel automatically detects Vite!
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-semibold text-stone-900">Build Settings (Pre-configured)</div>
                  <div className="grid grid-cols-2 gap-2 mt-2 bg-stone-100 p-3 rounded-lg text-xs font-mono">
                    <div>
                      <span className="text-stone-500 block">Framework:</span>
                      <span className="text-stone-900 font-bold">Vite</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Build Command:</span>
                      <span className="text-stone-900 font-bold">npm run build</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Output Directory:</span>
                      <span className="text-stone-900 font-bold">dist</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Install Command:</span>
                      <span className="text-stone-900 font-bold">npm install</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Optional vercel.json */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 text-xs">
                Optional: <code>vercel.json</code> for clean Single-Page routing
              </span>
              <button
                onClick={copyConfig}
                className="text-xs flex items-center gap-1.5 text-stone-600 hover:text-stone-900 bg-stone-200/60 px-2 py-1 rounded-md transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Config
              </button>
            </div>
            <pre className="bg-stone-900 text-stone-100 p-3 rounded-xl text-xs font-mono overflow-x-auto">
              {vercelJsonSnippet}
            </pre>
          </div>

          {/* Key Advantages */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-white border border-stone-200 rounded-xl text-center">
              <Globe className="w-5 h-5 text-stone-700 mx-auto mb-1.5" />
              <div className="font-bold text-xs text-stone-900">Custom Domain</div>
              <div className="text-[11px] text-stone-500">Free SSL included</div>
            </div>
            <div className="p-3 bg-white border border-stone-200 rounded-xl text-center">
              <Zap className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
              <div className="font-bold text-xs text-stone-900">&lt; 0.4s Speed</div>
              <div className="text-[11px] text-stone-500">Global Edge caching</div>
            </div>
            <div className="p-3 bg-white border border-stone-200 rounded-xl text-center">
              <Shield className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
              <div className="font-bold text-xs text-stone-900">100% Free Tier</div>
              <div className="text-[11px] text-stone-500">Unlimited bandwidth</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Got it, close
          </button>
        </div>
      </div>
    </div>
  );
};
