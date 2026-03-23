import { PropertyForm } from "@/components/admin/property-form";

export default function NewPropertyPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Nueva Propiedad
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Añade una nueva propiedad a tu cartera
        </p>
      </div>

      {/* Form */}
      <PropertyForm />
    </div>
  );
}
