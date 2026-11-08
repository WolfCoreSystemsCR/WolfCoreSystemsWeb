// Ilustración del hero: una ventana con un flujo de automatización en marcha.
const pasos = [
  { hora: "09:14", origen: "WhatsApp", texto: "Cliente pregunta por precios", estado: "Bot respondió" },
  { hora: "09:14", origen: "CRM", texto: "Nuevo prospecto registrado", estado: "Guardado" },
  { hora: "09:15", origen: "Agenda", texto: "Cita reservada para el jueves", estado: "Confirmada" },
  { hora: "09:20", origen: "Facturación", texto: "Factura electrónica emitida", estado: "Enviada" },
];

export function PanelAutomatizacion() {
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-electrico-500/20 blur-3xl" aria-hidden="true" />
      <div className="overflow-hidden rounded-2xl border border-linea bg-noche-900 shadow-2xl shadow-black/60">
        <div className="flex items-center gap-2 border-b border-linea bg-noche-850 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate font-mono text-xs text-acero">panel.wolfcore — automatizaciones</span>
        </div>

        <div className="grid gap-px bg-linea md:grid-cols-[13rem_1fr]">
          <aside className="hidden bg-noche-900 p-4 md:block">
            <p className="ceja mb-4 text-[0.65rem]">Flujos activos</p>
            <ul className="space-y-2 font-mono text-xs">
              {["Atención 24/7", "Ventas → CRM", "Citas", "Facturación", "Reportes"].map((f, i) => (
                <li
                  key={f}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
                    i === 0 ? "bg-electrico-400/10 text-electrico-300" : "text-acero"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full bg-electrico-400 ${i === 0 ? "pulso" : "opacity-60"}`} />
                  {f}
                </li>
              ))}
            </ul>
          </aside>

          <div className="bg-noche-900 p-4 sm:p-6">
            <div className="mb-5 grid grid-cols-3 gap-3">
              {[
                ["Mensajes atendidos", "128"],
                ["Horas ahorradas", "36 h"],
                ["Errores manuales", "0"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-linea bg-noche-850 p-3">
                  <p className="text-[0.7rem] leading-tight text-acero">{k}</p>
                  <p className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">{v}</p>
                </div>
              ))}
            </div>

            <ol className="space-y-2.5">
              {pasos.map((p) => (
                <li
                  key={p.texto}
                  className="flex items-center gap-3 rounded-lg border border-linea bg-noche-850/60 px-3 py-2.5 text-sm"
                >
                  <span className="font-mono text-xs text-acero">{p.hora}</span>
                  <span className="hidden rounded bg-noche-700 px-2 py-0.5 font-mono text-[0.7rem] text-electrico-200 sm:inline">
                    {p.origen}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-hielo/90">{p.texto}</span>
                  <span className="shrink-0 rounded-full bg-electrico-400/10 px-2.5 py-0.5 text-xs font-medium text-electrico-300">
                    {p.estado}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-[0.7rem] text-acero">
              <span className="text-electrico-400">›</span> Ejemplo ilustrativo de un flujo automatizado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
