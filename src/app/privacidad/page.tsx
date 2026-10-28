import type { Metadata } from "next";

import { site } from "@content/site";
import { LegalPage } from "@/components/legal-page";
import { OrPending } from "@/components/pending";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidad">
      <h2>Responsable</h2>
      <p>
        <OrPending value={site.legal.owner} what="titular" />, con NIF <OrPending value={site.legal.taxId} what="NIF" />{" "}
        y correo <OrPending value={site.email} what="correo de contacto" />.
      </p>

      <h2>Qué datos se tratan y para qué</h2>
      <p>
        Los que escribes en el formulario de contacto (nombre, correo y el contenido de tu mensaje), solo para responder a
        tu solicitud y, si lo pides, preparar una propuesta.
      </p>

      <h2>Base jurídica</h2>
      <p>Tu consentimiento, que das al enviar el formulario y puedes retirar en cualquier momento.</p>

      <h2>Conservación</h2>
      <p>
        Mientras dure la comunicación y, después, el tiempo necesario para atender posibles responsabilidades legales.
      </p>

      <h2>Destinatarios</h2>
      <p>
        No se ceden datos a terceros. El envío del formulario usa un proveedor de correo electrónico que actúa como
        encargado del tratamiento.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes pedir acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo al correo
        indicado arriba, y reclamar ante la Agencia Española de Protección de Datos (aepd.es).
      </p>

      <h2>Cookies</h2>
      <p>Esta web no usa cookies de análisis ni de publicidad.</p>
    </LegalPage>
  );
}
