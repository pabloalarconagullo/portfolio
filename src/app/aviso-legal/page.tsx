import type { Metadata } from "next";

import { site } from "@content/site";
import { LegalPage } from "@/components/legal-page";
import { OrPending } from "@/components/pending";

export const metadata: Metadata = {
  title: "Aviso legal",
  alternates: { canonical: "/aviso-legal" },
};

export default function LegalNoticePage() {
  return (
    <LegalPage title="Aviso legal">
      <h2>Titular</h2>
      <p>
        Titular: <OrPending value={site.legal.owner} what="titular" />. NIF:{" "}
        <OrPending value={site.legal.taxId} what="NIF" />. Domicilio:{" "}
        <OrPending value={site.legal.address} what="dirección" />. Correo:{" "}
        <OrPending value={site.email} what="correo de contacto" />.
      </p>

      <h2>Objeto</h2>
      <p>Esta web presenta los proyectos y servicios de desarrollo web de su titular y sirve como vía de contacto.</p>

      <h2>Propiedad intelectual</h2>
      <p>
        El diseño, los textos y el código de esta web pertenecen a su titular. Los nombres y obras de terceros que se
        mencionan pertenecen a sus respectivos autores.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        Las capturas muestran el estado de cada aplicación en el momento en que se tomaron y pueden no reflejar su
        versión actual.
      </p>
    </LegalPage>
  );
}
