/** Foto de Unsplash (licencia libre) recortada al tamaño pedido. */
export const foto = (id: string, ancho = 1600, alto?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${ancho}${alto ? `&h=${alto}` : ""}&q=75`;
