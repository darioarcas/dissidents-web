


export  const convertirASlug = (texto) => {
    return texto
      .normalize('NFD')                         // separa tildes de letras (ej: á → a + ́)
      .replace(/[\u0300-\u036f]/g, '')          // elimina los signos diacríticos (tildes)
      .toLowerCase()                            // pasa a minúsculas
      .trim()                                   // quita espacios al principio y al final
      .replace(/[^a-z0-9\s-]/g, '')             // elimina caracteres no válidos (excepto espacios y guiones)
      .replace(/\s+/g, '-')                     // reemplaza espacios por guiones
      .replace(/-+/g, '-');                     // reemplaza múltiples guiones por uno solo
  };