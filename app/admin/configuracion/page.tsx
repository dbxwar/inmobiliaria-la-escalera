import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";

export default function SettingsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Configuración
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ajustes generales de la agencia
        </p>
      </div>

      <form className="max-w-2xl">
        <FieldGroup className="gap-6">
          {/* Agency Info */}
          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Información de la Agencia
            </h2>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="agencyName">Nombre de la Agencia</FieldLabel>
                <Input
                  id="agencyName"
                  defaultValue="Inmobiliaria La Escalera"
                  className="bg-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email de Contacto</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  defaultValue="info@valenciaestates.es"
                  className="bg-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+34 961 234 567"
                  className="bg-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="address">Dirección</FieldLabel>
                <Textarea
                  id="address"
                  rows={2}
                  defaultValue="Calle Colón 42, 46004 Valencia"
                  className="bg-white resize-none"
                />
              </Field>
            </FieldGroup>
          </div>

          {/* Social Media */}
          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Redes Sociales
            </h2>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="instagram">Instagram</FieldLabel>
                <Input
                  id="instagram"
                  placeholder="@valenciaestates"
                  className="bg-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="facebook">Facebook</FieldLabel>
                <Input
                  id="facebook"
                  placeholder="facebook.com/valenciaestates"
                  className="bg-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="linkedin">LinkedIn</FieldLabel>
                <Input
                  id="linkedin"
                  placeholder="linkedin.com/company/valenciaestates"
                  className="bg-white"
                />
              </Field>
            </FieldGroup>
          </div>

          {/* Save */}
          <div className="flex gap-3">
            <Button type="submit" className="bg-navy hover:bg-navy/90">
              Guardar Cambios
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
