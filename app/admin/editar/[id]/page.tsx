import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/admin/property-form";
import { actualizarPropiedad } from "@/lib/actions";
import { createClient } from "@/lib/supabase-server";
import { Propiedad } from "@/lib/supabase";

export default async function EditarPropiedadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("propiedades")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  const propiedad = data as Propiedad;

  async function action(formData: FormData) {
    "use server";
    await actualizarPropiedad(id, formData);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Editar propiedad</h1>
        <p className="text-sm text-muted-foreground mt-1">{propiedad.titulo}</p>
      </div>
      <PropertyForm propiedad={propiedad} action={action} />
    </div>
  );
}
