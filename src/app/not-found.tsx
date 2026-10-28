import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell pb-28 pt-20">
      <div className="with-margin">
        <div>
          <h1 className="t-display max-w-[14ch]">Esta página no existe</h1>
          <p className="t-lead mt-6 max-w-[44ch]">
            Puede que el enlace esté mal escrito o que el proyecto ya no se muestre.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">
              Ir a la portada
            </Link>
            <Link href="/proyectos" className="btn btn-quiet">
              Ver proyectos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
