// Datos de contacto y contenido editable de WolfCore Systems.
// Los valores marcados con [CONFIRMAR] deben revisarse antes de publicar.

export const empresa = {
  nombre: "WolfCore Systems",
  lema: "Automatización, apps y sistemas para escalar tu negocio al mejor precio.",
  instagram: "https://www.instagram.com/wolfcoresystems",
  instagramMensaje: "https://ig.me/m/wolfcoresystems",
  correo: "wolfcoresystemscr@gmail.com",
  // [CONFIRMAR] Número de WhatsApp con código de país, solo dígitos. Ej: "50688887777".
  whatsapp: "",
  ubicacion: "Costa Rica",
};

/** Enlace para escribir "Wolf": WhatsApp si hay número, si no, mensaje directo de Instagram. */
export function enlaceWolf(): string {
  if (empresa.whatsapp) {
    return `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent("Wolf")}`;
  }
  return empresa.instagramMensaje;
}

// [CONFIRMAR] Cifras reales de la empresa. Mejor pocas y verdaderas que muchas e infladas.
export const cifras = [
  { valor: "100%", etiqueta: "Desarrollo a la medida" },
  { valor: "24/7", etiqueta: "Automatizaciones trabajando" },
  { valor: "1:1", etiqueta: "Trato directo con el desarrollador" },
  { valor: "CR", etiqueta: "Equipo en Costa Rica" },
];

export const pilares = [
  {
    titulo: "Una sola solución, no diez herramientas",
    texto:
      "Analizamos cómo trabaja su negocio y construimos un sistema que une ventas, clientes, inventario y reportes en un solo lugar.",
  },
  {
    titulo: "Calidad que no se rompe al crecer",
    texto:
      "Código ordenado, pruebas y buenas prácticas de seguridad desde el día uno, para que su sistema aguante cuando el negocio despegue.",
  },
  {
    titulo: "Precio justo y comunicación clara",
    texto:
      "Cotizaciones transparentes, avances que usted puede ver y una persona que le responde. Sin letra pequeña ni tecnicismos.",
  },
];

export const proceso = [
  { titulo: "Escuchar", texto: "Entendemos su negocio, sus metas y lo que hoy le quita tiempo." },
  { titulo: "Diseñar", texto: "Proponemos la solución, el alcance y el precio por escrito." },
  { titulo: "Construir", texto: "Desarrollamos por etapas y le mostramos avances reales." },
  { titulo: "Probar", texto: "Validamos con usted y con datos de prueba antes de lanzar." },
  { titulo: "Lanzar", texto: "Publicamos, capacitamos a su equipo y acompañamos el arranque." },
  { titulo: "Mejorar", texto: "Medimos resultados y ajustamos para que siga creciendo." },
];

export type Servicio = { icono: IconoNombre; titulo: string; texto: string };
export type IconoNombre =
  | "rayo"
  | "web"
  | "movil"
  | "bot"
  | "enlace"
  | "escudo"
  | "codigo"
  | "grafico";

export const servicioPrincipal = {
  titulo: "Sistemas a la medida que mueven su negocio",
  texto:
    "Diseñamos y construimos el software que su operación necesita: desde la idea hasta el lanzamiento, pensado para crecer con usted.",
  puntos: [
    "Análisis, diseño, desarrollo e integración de punta a punta.",
    "Entregas por etapas con avances visibles y fáciles de revisar.",
    "Hecho para escalar: más clientes, más sucursales, más datos.",
  ],
};

export const servicios: Servicio[] = [
  {
    icono: "rayo",
    titulo: "Automatización de procesos",
    texto: "Elimine tareas repetitivas: facturas, recordatorios, reportes y seguimientos que se hacen solos.",
  },
  {
    icono: "web",
    titulo: "Aplicaciones web",
    texto: "Paneles internos, portales para clientes y sistemas de gestión accesibles desde cualquier lugar.",
  },
  {
    icono: "movil",
    titulo: "Apps móviles",
    texto: "Aplicaciones para Android y iPhone conectadas directamente con la operación de su negocio.",
  },
  {
    icono: "bot",
    titulo: "Chatbots e inteligencia artificial",
    texto: "Asistentes que responden en WhatsApp e Instagram, califican clientes y agendan citas 24/7.",
  },
  {
    icono: "enlace",
    titulo: "Integraciones y APIs",
    texto: "Conectamos sus herramientas actuales: pagos, facturación electrónica, CRM, hojas de cálculo y más.",
  },
  {
    icono: "web",
    titulo: "Páginas web profesionales",
    texto: "Sitios rápidos, modernos y optimizados para que su negocio se vea serio y lo encuentren en Google.",
  },
];

// [CONFIRMAR] Usar solo proyectos con permiso del cliente para mostrarlos.
export const proyectos = [
  {
    categoria: "Salud y servicios sociales",
    titulo: "Gestión de expedientes para un centro diurno de adultos mayores",
    texto:
      "Sistema web con roles y permisos, asistencia diaria, información médica confidencial, planes de atención, documentos y página pública editable.",
    etiquetas: ["Next.js", "PostgreSQL", "Seguridad por roles"],
  },
];

export const modalidades = [
  {
    etiqueta: "PROYECTO",
    titulo: "Proyecto a la medida",
    texto:
      "Usted nos cuenta el problema, nosotros entregamos la solución completa: diseño, desarrollo, lanzamiento y capacitación.",
  },
  {
    etiqueta: "PLAN MENSUAL",
    titulo: "Soporte y mejora continua",
    texto:
      "Mantenimiento, respaldos, nuevas funciones y atención prioritaria por una cuota mensual fija, sin sorpresas.",
  },
  {
    etiqueta: "ALIADO",
    titulo: "Su equipo de tecnología",
    texto:
      "Para negocios sin departamento de TI: nos convertimos en su equipo técnico y lo acompañamos en cada decisión digital.",
  },
];
