'use client';

import { useEffect, useState } from 'react';
import { Bot, MessageSquareWarning, X } from 'lucide-react';

export default function AssistantPage() {
  const [questionsLeft, setQuestionsLeft] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('sehha_bot_questions');
    if (stored === null) {
      localStorage.setItem('sehha_bot_questions', '3');
      setQuestionsLeft(3);
    } else {
      setQuestionsLeft(parseInt(stored, 10));
    }
  }, []);

  const handleSimulateQuestion = () => {
     if (questionsLeft !== null && questionsLeft > 0) {
        const newVal = questionsLeft - 1;
        setQuestionsLeft(newVal);
        localStorage.setItem('sehha_bot_questions', newVal.toString());
     }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-140px)] flex flex-col items-center py-12 px-4 sm:px-6 relative w-full">
      <div className="text-center max-w-2xl mb-10 z-10 w-full">
         <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-ok text-sm font-semibold mb-6">
            Accès Complet — L'assistant IA est prêt
         </div>
         <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">Parlez à SEHHA DATA Assistant</h1>
         <p className="text-lg text-slate-600">Posez vos questions sur la situation épidémiologique, l'assistant IA vous répondra en utilisant nos données sécurisées.</p>
      </div>

         <div className="relative w-full max-w-4xl h-[600px] border border-slate-200 rounded-2xl shadow-sm bg-slate-50 flex items-center justify-center flex-col overflow-hidden">
            <div className="flex flex-col items-center text-center p-8">
               <Bot className="w-16 h-16 text-slate-400 mb-4 opacity-50" />
               <p className="text-slate-500 mb-6 max-w-md">
                 Le widget Botpress officiel s'affichera ici une fois l'ID configuré. <br/>
                 Le professeur peut consulter et interagir en illimité.
               </p>
               <button 
                  onClick={handleSimulateQuestion}
                  className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
               >
                  Simuler une question posée ({questionsLeft} posées)
               </button>
            </div>
         </div>
    </div>
  );
}
