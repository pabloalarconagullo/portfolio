/** Marca visible para un dato que aún no se ha configurado en content/. */
export function Pending({ what }: { what: string }) {
  return (
    <span className="pending" title={`Configúralo en la carpeta content/: ${what}`}>
      Pendiente: {what}
    </span>
  );
}

/** Muestra el valor configurado o, si falta, la marca «Pendiente». */
export function OrPending({ value, what }: { value: string | null; what: string }) {
  return value ? <>{value}</> : <Pending what={what} />;
}
