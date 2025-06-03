"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function WarningDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
            ⚠️ Avertissement Important
          </DialogTitle>
          <div className="pt-4 space-y-4">
            <h2 className="font-medium text-base text-foreground">
              Bienvenue sur StoryCareer ! Voici quelques règles importantes :
            </h2>
            <ul className="space-y-2 text-sm list-none">
              <li>• Les stories doivent être authentiques et respectueuses</li>
              <li>• Les contenus inappropriés entraîneront un bannissement</li>
              <li>• Pour les développeurs en test : vos stories seront automatiquement supprimées après 24h</li>
              <li>• Tout contenu malveillant sera signalé et l&apos;utilisateur banni</li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                Si vous rencontrez des problèmes techniques ou avez des questions, contactez notre support.
              </span>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
} 