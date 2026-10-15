import React from 'react';
import { KhitbahRequest } from '../types';
import { HeartHandshake, ShieldCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface MyRequestsViewProps {
  requests: KhitbahRequest[];
  onExploreProfiles: () => void;
  onCancelRequest: (id: string) => void;
}

export const MyRequestsView: React.FC<MyRequestsViewProps> = ({
  requests,
  onExploreProfiles,
  onCancelRequest,
}) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="border-b border-stone-200 pb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            <span>Espace Confidentiel</span>
            <span aria-hidden="true">·</span>
            <span>Suivi des Démarches</span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Mes Demandes de Mise en Relation & Khitbah
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Suivi des dossiers officiels transmis aux tuteurs légaux (Wali) dans le respect de l'Adab islamique.
          </p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-500">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <h3 className="mt-3 font-serif text-lg font-bold text-stone-900">
            Aucune démarche en cours pour le moment
          </h3>
          <p className="mt-1 text-xs text-stone-600 max-w-md mx-auto">
            Lorsque vous initiez une demande de Khitbah auprès d'un profil vérifié, vous retrouverez ici l'état d'avancement et la réponse du tuteur légal.
          </p>
          <button
            onClick={onExploreProfiles}
            className="mt-5 rounded-md bg-emerald-800 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900"
          >
            Découvrir les profils au Niger
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs transition hover:border-stone-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-stone-900">
                      Demande pour : {req.targetProfileName}
                    </h4>
                    <div className="text-xs text-stone-500">
                      Envoyée par : {req.senderName} ({req.senderPhone}) · {req.createdAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                    <span>{req.status}</span>
                  </span>
                </div>
              </div>

              {/* Message preview */}
              <div className="mt-3 text-xs text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                <div className="font-semibold text-stone-900 mb-1">Votre lettre d'intention :</div>
                <p className="italic">« {req.message} »</p>
                {req.waliContactNote && (
                  <div className="mt-2 text-stone-500 border-t border-stone-200 pt-2 text-[11px]">
                    Note pour le Wali : {req.waliContactNote}
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
                <span>Le tuteur prendra contact par téléphone ou WhatsApp pour convenir d'une première Mouqabala encadrée.</span>
                <button
                  onClick={() => onCancelRequest(req.id)}
                  className="text-stone-400 hover:text-red-700 font-medium transition text-xs"
                >
                  Annuler la démarche
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
