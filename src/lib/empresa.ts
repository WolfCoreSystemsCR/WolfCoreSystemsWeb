// Contenido editable de WolfCore Systems.
// Los valores marcados con [CONFIRMAR] deben revisarse antes de publicar:
// en una página de servicios, cada promesa tiene que poder cumplirse.

export const empresa = {
  nombre: "WolfCore Systems",
  lema: "Automatización, apps y sistemas para escalar su negocio al mejor precio.",
  descripcion:
    "Desarrollo de software a la medida en Costa Rica: automatización de procesos, aplicaciones web y móviles, chatbots para WhatsApp e integraciones para pymes.",
  instagram: "https://www.instagram.com/wolfcoresystems",
  instagramUsuario: "@wolfcoresystems",
  instagramMensaje: "https://ig.me/m/wolfcoresystems",
  correo: "wolfcoresystemscr@gmail.com",
  // [CONFIRMAR] Número de WhatsApp con código de país, solo dígitos. Ej: "50688887777".
  whatsapp: "",
  ubicacion: "Costa Rica",
  // [CONFIRMAR] Horario de atención.
  horario: "Lunes a viernes, 8:00 a. m. – 6:00 p. m.",
};

/** URL pública del sitio (para SEO). En Vercel, defina NEXT_PUBLIC_SITIO_URL. */
export const sitioUrl = (process.env.NEXT_PUBLIC_SITIO_URL?.trim() || "http://localhost:3000").replace(/\/$/, "");

/** Enlace para escribir "Wolf": WhatsApp si hay número; si no, mensaje directo de Instagram. */
export function enlaceWolf(): string {
  if (empresa.whatsapp) {
    return `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent("Wolf")}`;
  }
  return empresa.instagramMensaje;
}
export const canalWolf = empresa.whatsapp ? "WhatsApp" : "Instagram";

export type IconoNombre =
  | "rayo"
  | "web"
  | "movil"
  | "bot"
  | "enlace"
  | "escudo"
  | "codigo"
  | "grafico"
  | "factura"
  | "calendario"
  | "caja"
  | "reloj"
  | "chat"
  | "moneda";

// [CONFIRMAR] Beneficios que se muestran bajo el título principal.
export const beneficios = ["Primera asesoría sin costo", "Cotización en colones o dólares", "Pago por etapas"];

export const tecnologias = [
  "Next.js",
  "Node.js",
  "React",
  "TypeScript",
  "PostgreSQL",
  "WhatsApp Business API",
  "Inteligencia artificial",
  "Facturación electrónica",
  "Android e iOS",
  "Google Workspace",
  "Pagos en línea",
  "Vercel",
];

export const problemas: { icono: IconoNombre; problema: string; solucion: string }[] = [
  {
    icono: "chat",
    problema: "Pedidos y consultas perdidos entre chats de WhatsApp.",
    solucion: "Un asistente que responde al instante, toma el pedido y lo registra solo.",
  },
  {
    icono: "caja",
    problema: "Inventario y ventas en hojas de Excel que nadie actualiza.",
    solucion: "Un sistema en la nube con inventario, ventas y reportes al día.",
  },
  {
    icono: "factura",
    problema: "Horas haciendo facturas, cobros y recordatorios a mano.",
    solucion: "Facturas, cobros y avisos que se envían automáticamente.",
  },
  {
    icono: "calendario",
    problema: "Citas por teléfono, choques de horario y clientes que no llegan.",
    solucion: "Agenda en línea con confirmación y recordatorio automático.",
  },
  {
    icono: "grafico",
    problema: "No sabe con certeza cuánto vende ni qué le deja ganancia.",
    solucion: "Un panel con sus números claros, desde el celular.",
  },
  {
    icono: "reloj",
    problema: "Usted hace todo y el negocio no crece sin usted presente.",
    solucion: "Procesos ordenados que funcionan aunque usted no esté.",
  },
];

export const servicioPrincipal = {
  titulo: "Sistemas a la medida que mueven su negocio",
  texto:
    "Diseñamos y construimos el software que su operación necesita, desde la idea hasta el lanzamiento, pensado para crecer con usted.",
  puntos: [
    "Análisis, diseño, desarrollo e integración de punta a punta.",
    "Entregas por etapas con avances que usted puede probar.",
    "Listo para escalar: más clientes, más sucursales, más datos.",
  ],
};

export const servicios: { icono: IconoNombre; titulo: string; texto: string }[] = [
  {
    icono: "rayo",
    titulo: "Automatización de procesos",
    texto: "Elimine tareas repetitivas: facturas, recordatorios, reportes y seguimientos que se hacen solos.",
  },
  {
    icono: "bot",
    titulo: "Chatbots e inteligencia artificial",
    texto: "Asistentes que atienden en WhatsApp e Instagram, califican clientes y agendan citas 24/7.",
  },
  {
    icono: "web",
    titulo: "Aplicaciones web",
    texto: "Paneles internos, portales para clientes y sistemas de gestión desde cualquier lugar.",
  },
  {
    icono: "movil",
    titulo: "Apps móviles",
    texto: "Aplicaciones para Android y iPhone conectadas con la operación de su negocio.",
  },
  {
    icono: "enlace",
    titulo: "Integraciones y APIs",
    texto: "Conectamos sus herramientas: pagos, facturación electrónica, CRM y hojas de cálculo.",
  },
  {
    icono: "codigo",
    titulo: "Páginas web profesionales",
    texto: "Sitios rápidos y modernos para que su negocio se vea serio y lo encuentren en Google.",
  },
];

/** Opciones del formulario (también las valida el servidor). */
export const opcionesServicio = [
  servicioPrincipal.titulo,
  ...servicios.map((s) => s.titulo),
  "No estoy seguro, quiero asesoría",
];

export const proceso = [
  { titulo: "Escuchamos", texto: "Una llamada o reunión para entender su negocio y lo que hoy le quita tiempo." },
  { titulo: "Proponemos", texto: "Le enviamos alcance, tiempos y precio por escrito. Sin sorpresas." },
  { titulo: "Construimos", texto: "Desarrollamos por etapas y le mostramos avances reales para que opine." },
  { titulo: "Probamos", texto: "Validamos con usted y con datos de prueba antes de salir a producción." },
  { titulo: "Lanzamos", texto: "Publicamos, capacitamos a su equipo y acompañamos los primeros días." },
  { titulo: "Mejoramos", texto: "Medimos resultados y ajustamos para que el sistema crezca con usted." },
];

export const pilares = [
  {
    icono: "rayo" as IconoNombre,
    titulo: "Una solución, no diez herramientas",
    texto: "Unimos ventas, clientes, inventario y reportes en un solo sistema hecho para su forma de trabajar.",
  },
  {
    icono: "escudo" as IconoNombre,
    titulo: "Seguro y hecho para crecer",
    texto: "Buenas prácticas de seguridad y código ordenado desde el día uno, para que nada se rompa al crecer.",
  },
  {
    icono: "chat" as IconoNombre,
    titulo: "Trato directo y lenguaje claro",
    texto: "Habla con quien construye su sistema. Le explicamos todo sin tecnicismos y le respondemos rápido.",
  },
  {
    icono: "moneda" as IconoNombre,
    titulo: "Precio justo, a la tica",
    texto: "Cotizaciones transparentes, pagos por etapas y soluciones a la medida de una pyme costarricense.",
  },
];

// [CONFIRMAR] Cifras reales. Mejor pocas y verdaderas que muchas e infladas.
export const cifras = [
  { valor: "100%", etiqueta: "Desarrollo a la medida" },
  { valor: "24/7", etiqueta: "Automatizaciones trabajando" },
  { valor: "1 a 1", etiqueta: "Trato directo con el desarrollador" },
  { valor: "CR", etiqueta: "Hecho en Costa Rica" },
];

// [CONFIRMAR] Mostrar solo proyectos con permiso del cliente.
export const proyectos = [
  {
    categoria: "Salud y servicios sociales",
    titulo: "Expedientes digitales para un centro diurno de adultos mayores",
    texto:
      "Reemplazó carpetas de papel por un sistema web con roles y permisos, asistencia diaria, información médica confidencial, planes de atención y una página pública que el centro edita sin ayuda.",
    etiquetas: ["Next.js", "PostgreSQL", "Seguridad por roles", "Ley 8968"],
  },
];

export const modalidades = [
  {
    etiqueta: "Proyecto",
    titulo: "Proyecto a la medida",
    texto: "Usted nos cuenta el problema; nosotros entregamos la solución completa.",
    incluye: ["Análisis y propuesta por escrito", "Diseño y desarrollo por etapas", "Lanzamiento y capacitación"],
    destacado: false,
  },
  {
    etiqueta: "Más elegido",
    titulo: "Proyecto + soporte mensual",
    texto: "Su sistema siempre al día, con alguien que responde cuando lo necesita.",
    incluye: ["Todo lo del proyecto", "Mantenimiento y respaldos", "Mejoras y atención prioritaria"],
    destacado: true,
  },
  {
    etiqueta: "Aliado",
    titulo: "Su equipo de tecnología",
    texto: "Para negocios sin departamento de TI: lo acompañamos en cada decisión digital.",
    incluye: ["Asesoría continua", "Desarrollo de nuevas soluciones", "Gestión de proveedores y cuentas"],
    destacado: false,
  },
];

// [CONFIRMAR] Revisar cada respuesta con la realidad de la empresa.
export const preguntas = [
  {
    pregunta: "¿Cuánto cuesta un sistema o una automatización?",
    respuesta:
      "Depende del alcance. Después de una primera conversación sin costo, le enviamos una cotización por escrito en colones o dólares, con el precio total y lo que incluye. Empezamos por lo que más impacto tiene y crecemos por etapas.",
  },
  {
    pregunta: "¿Cuánto tiempo tarda?",
    respuesta:
      "Una automatización o un sitio web puede estar listo en pocas semanas; un sistema completo, en uno a tres meses según su tamaño. En la propuesta le damos fechas por etapa.",
  },
  {
    pregunta: "¿Cómo se paga?",
    respuesta:
      "Por etapas: un adelanto para iniciar y el resto contra entregas. Aceptamos transferencia y SINPE Móvil, con factura electrónica.",
  },
  {
    pregunta: "No sé nada de tecnología, ¿igual me sirve?",
    respuesta:
      "Sí. Usted nos explica cómo trabaja su negocio y nosotros lo traducimos a tecnología. Le entregamos el sistema funcionando, le capacitamos y le dejamos guías sencillas.",
  },
  {
    pregunta: "¿El sistema y los datos son míos?",
    respuesta:
      "Sí. Los datos de su negocio son suyos y los manejamos con confidencialidad, siguiendo la Ley 8968 de Protección de Datos. Al finalizar le entregamos accesos y documentación.",
  },
  {
    pregunta: "¿Qué pasa si algo falla después de entregar?",
    respuesta:
      "Todo proyecto incluye un periodo de garantía para corregir errores. Después puede contratar el soporte mensual para mantenimiento, respaldos y mejoras.",
  },
];
