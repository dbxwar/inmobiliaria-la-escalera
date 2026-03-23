import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertiesTable } from "@/components/admin/properties-table";
import { getPropiedades } from "@/lib/actions";

export default async function AdminPropertiesPage() {
  const propiedades = await getPropiedades();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Propiedades</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {propiedades.length} propiedad{propiedades.length !== 1 ? "es" : ""} en total
          </p>
        </div>
        <Button asChild className="bg-[#1A2240] hover:bg-[#1A2240]/90">
          <Link href="/admin/nueva">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Propiedad
          </Link>
        </Button>
      </div>

      <PropertiesTable propiedades={propiedades} />
    </div>
  );
}
