'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  const checkInstalled = useCallback(() => {
    return typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches;
  }, []);

  useEffect(() => {
    if (checkInstalled()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    const installHandler = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', installHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installHandler);
    };
  }, [checkInstalled]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      // Installation accepted
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    setDeferredPrompt(null);
  };

  if (checkInstalled() || !showPrompt) return null;

  return (
    <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
      <DialogContent className="sm:max-w-[340px] rounded-2xl border-green-200 bg-gradient-to-b from-green-50 to-white">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center">
            <Download className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-xl text-green-800">
            Installe AfriSpeak 🎉
          </DialogTitle>
          <DialogDescription className="text-sm text-green-700 mt-2">
            Ajoute AfriSpeak à ton écran d&apos;accueil pour apprendre l&apos;anglais
            n&apos;importe où, même hors ligne !
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-2">
          <Button
            onClick={handleInstall}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-base"
          >
            <Download className="w-5 h-5 mr-2" />
            Installer l&apos;application
          </Button>
          <Button
            variant="ghost"
            onClick={handleDismiss}
            className="w-full text-gray-500 text-sm"
          >
            Plus tard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
