// Contenido editable de WolfCore Systems.
// Los valores marcados con [CONFIRMAR] deben revisarse antes de publicar:
// en una página de servicios, cada promesa tiene que poder cumplirse.

export const empresa = {
  nombre: "WolfCore Systems",
  lema: "Páginas web premium y automatización para negocios que quieren verse como lo que valen.",
  descripcion:
    "Diseño web premium, citas automáticas y atención por WhatsApp para clínicas estéticas, clínicas dentales, inmobiliarias y negocios de alto nivel en Escazú, Santa Ana, Pinares y Belén, Costa Rica.",
  instagram: "https://www.instagram.com/wolfcoresystems",
  instagramUsuario: "@wolfcoresystems",
  instagramMensaje: "https://ig.me/m/wolfcoresystems",
  correo: "wolfcoresystemscr@gmail.com",
  // Número de WhatsApp con código de país, solo dígitos.
  whatsapp: "50662966167",
  // Mismo número, como se muestra a las personas.
  telefono: "+506 6296-6167",
  ubicacion: "Costa Rica",
  // [CONFIRMAR] Horario de atención.
  horario: "Lunes a viernes, 8:00 a. m. – 6:00 p. m.",
};

/**
 * URL pública del sitio (para SEO). En Vercel, defina NEXT_PUBLIC_SITIO_URL.
 * Si falta, se usa el dominio de producción: un respaldo a localhost publicaría
 * URL canónicas, sitemap y Open Graph apuntando a localhost.
 */
export const sitioUrl = (process.env.NEXT_PUBLIC_SITIO_URL?.trim() || "https://wolfcoresystems-three.vercel.app").replace(/\/$/, "");

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
export const beneficios = ["Diseño 100 % original", "Primera asesoría sin costo", "Pago por etapas"];

/** Palabras que rotan en el título principal: los nichos en los que nos enfocamos. */
export const nichosTitulo = [
  "clínica estética",
  "clínica dental",
  "inmobiliaria",
  "bufete",
  "veterinaria",
  "academia",
];

/** Páginas de muestra (rutas en /ejemplos). Son diseños ficticios hechos por WolfCore Systems. */
export const demos = [
  { slug: "estetica", nicho: "Clínica estética", marca: "Velora", dominio: "velora-estetica.cr" },
  { slug: "dental", nicho: "Clínica dental", marca: "Bruma Dental", dominio: "brumadental.cr" },
  { slug: "inmobiliaria", nicho: "Inmobiliaria", marca: "Cumbre Residences", dominio: "cumbreresidences.cr" },
  { slug: "abogados", nicho: "Bufete", marca: "Mirador Legal", dominio: "miradorlegal.cr" },
  { slug: "veterinaria", nicho: "Veterinaria", marca: "Aldea Vet", dominio: "aldeavet.cr" },
  { slug: "trading", nicho: "Trading", marca: "Kappa Mercados", dominio: "kappamercados.com" },
] as const;

/** Clientes ideales en Escazú, Santa Ana, Pinares y Belén. */
export const nichos: { icono: IconoNombre; titulo: string; porque: string; vendemos: string }[] = [
  {
    icono: "rayo",
    titulo: "Clínicas estéticas",
    porque: "Cada paciente vale cientos de dólares y casi todos llegan buscando en Google o Instagram.",
    vendemos: "Página de lujo + agenda de valoraciones por WhatsApp las 24 horas.",
  },
  {
    icono: "chat",
    titulo: "Clínicas dentales",
    porque: "Costa Rica recibe miles de pacientes extranjeros al año para implantes y diseño de sonrisa.",
    vendemos: "Sitio bilingüe para turismo dental + seguimiento de pacientes.",
  },
  {
    icono: "web",
    titulo: "Inmobiliarias y desarrolladores",
    porque: "Venden propiedades de cientos de miles de dólares; una buena presentación cierra negocios.",
    vendemos: "Catálogo de propiedades elegante + captación de compradores.",
  },
  {
    icono: "escudo",
    titulo: "Bufetes y notarías",
    porque: "Residencias, sociedades y bienes raíces para extranjeros: clientes que pagan por confianza.",
    vendemos: "Web sobria y bilingüe + filtro de consultas que ahorra horas.",
  },
  {
    icono: "calendario",
    titulo: "Veterinarias premium",
    porque: "En la zona oeste las mascotas son familia y sus dueños invierten en lo mejor.",
    vendemos: "Página cálida + citas, vacunas y recordatorios automáticos.",
  },
  {
    icono: "grafico",
    titulo: "Educación financiera y trading",
    porque: "Academias y mentores venden cursos y membresías de alto valor en línea.",
    vendemos: "Web informativa con credibilidad + venta de cursos y comunidad.",
  },
];

export const servicioPrincipal = {
  titulo: "Páginas web premium que atraen clientes",
  texto:
    "Diseñamos su página desde cero, con la imagen que su negocio merece, para que el cliente confíe en usted antes de escribirle.",
  puntos: [
    "Diseño original, con animaciones y fotos que transmiten calidad.",
    "Pensada para el celular, que es donde lo buscan sus clientes.",
    "Lista para aparecer en Google y recibir consultas por WhatsApp.",
  ],
};

export const servicios: { icono: IconoNombre; titulo: string; texto: string }[] = [
  {
    icono: "calendario",
    titulo: "Citas que se agendan solas",
    texto: "Sus clientes reservan a cualquier hora y reciben confirmación y recordatorio. Menos ausencias, más ventas.",
  },
  {
    icono: "bot",
    titulo: "Atención por WhatsApp 24/7",
    texto: "Un asistente que responde al instante, resuelve dudas frecuentes y le pasa solo los clientes listos para comprar.",
  },
  {
    icono: "grafico",
    titulo: "Sistema para su negocio",
    texto: "Todos sus clientes, citas, cobros y seguimientos en un solo lugar, desde el celular o la computadora.",
  },
  {
    icono: "movil",
    titulo: "App con su marca",
    texto: "Su logo en el celular de sus clientes: reservas, promociones y beneficios a un toque.",
  },
  {
    icono: "rayo",
    titulo: "Procesos automáticos",
    texto: "Recordatorios, cobros, reportes y seguimientos que se hacen solos mientras usted atiende.",
  },
  {
    icono: "web",
    titulo: "Más clientes desde Google",
    texto: "Optimizamos su página y su perfil de Google para que lo encuentren cuando lo buscan.",
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
    titulo: "Diseño que vende, no plantillas",
    texto: "Cada página se diseña desde cero para su marca. Su cliente lo nota y confía más en usted.",
  },
  {
    icono: "escudo" as IconoNombre,
    titulo: "Seguro y hecho para crecer",
    texto: "Su página y los datos de sus clientes protegidos desde el día uno, listos para crecer con usted.",
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
