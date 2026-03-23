"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, GripVertical } from "lucide-react";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { crearPropiedad, uploadImagen } from "@/lib/actions";
import { Propiedad } from "@/lib/supabase";

const propertyTypes = [
  { value: "piso", label: "Piso" },
  { value: "casa", label: "Casa" },
  { value: "chalet", label: "Chalet" },
  { value: "atico", label: "Ático" },
  { value: "local", label: "Local" },
  { value: "terreno", label: "Terreno" },
];

const operationTypes = [
  { value: "venta", label: "Venta" },
  { value: "alquiler", label: "Alquiler" },
];

const statusOptions = [
  { value: "activo", label: "Activo" },
  { value: "vendido", label: "Vendido" },
  { value: "alquilado", label: "Alquilado" },
  { value: "reservado", label: "Reservado" },
];

const energyCerts = ["A", "B", "C", "D", "E", "F", "G", "En trámite", "Exento"];
const garageOptions = ["Incluido", "Opcional", "No incluye"];
const orientacionOptions = ["Norte", "Sur", "Este", "Oeste", "Noreste", "Noroeste", "Sureste", "Suroeste"];

const amenities = [
  "Aire Acondicionado",
  "Calefacción Central",
  "Suelo Radiante",
  "Armarios Empotrados",
  "Cocina Equipada",
  "Electrodomésticos Incluidos",
  "Amueblado",
  "Doble Acristalamiento",
  "Puerta Blindada",
  "Alarma",
  "Vistas al Mar",
  "Vistas a Montaña",
  "Zona Tranquila",
  "Portero",
  "Gimnasio",
  "Pádel",
];

type ImagePreview = {
  id: string;
  file?: File;
  preview: string;
  url?: string;
};

function SortableImage({
  image,
  index,
  onRemove,
}: {
  image: ImagePreview;
  index: number;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group aspect-[4/3] rounded-sm overflow-hidden bg-muted"
    >
      <Image src={image.preview} alt="Preview" fill className="object-cover" />
      {index === 0 && (
        <span className="absolute top-1.5 left-1.5 bg-[#FFFFFF] text-[#1A2240] text-[10px] font-semibold px-2 py-0.5 z-10">
          Principal
        </span>
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-1.5 rounded-sm bg-white/90 hover:bg-white transition-colors cursor-grab active:cursor-grabbing"
          title="Arrastrar para reordenar"
        >
          <GripVertical className="h-4 w-4 text-foreground" />
        </button>
        <button
          type="button"
          onClick={() => onRemove(image.id)}
          className="p-1.5 rounded-sm bg-white/90 hover:bg-white transition-colors"
          title="Eliminar"
        >
          <X className="h-4 w-4 text-destructive" />
        </button>
      </div>
    </div>
  );
}

type Props = {
  propiedad?: Propiedad;
  action?: (formData: FormData) => Promise<void>;
};

export function PropertyForm({ propiedad, action }: Props) {
  const [images, setImages] = useState<ImagePreview[]>(
    propiedad?.imagenes?.map((url) => ({ id: url, preview: url, url })) ?? []
  );
  const [uploading, setUploading] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    propiedad?.caracteristicas ?? []
  );

  // Select states (shadcn Select needs controlled state for hidden inputs)
  const [tipo, setTipo] = useState(propiedad?.tipo ?? "");
  const [operacion, setOperacion] = useState(propiedad?.operacion ?? "");
  const [estado, setEstado] = useState(propiedad?.estado ?? "activo");
  const [municipio, setMunicipio] = useState(propiedad?.municipio ?? "");
  const [certEnergetico, setCertEnergetico] = useState(propiedad?.certificado_energetico ?? "");
  const [garaje, setGaraje] = useState(propiedad?.garaje ?? "");
  const [orientacion, setOrientacion] = useState(propiedad?.orientacion ?? "");

  // Boolean fields
  const [trastero, setTrastero] = useState(propiedad?.trastero ?? false);
  const [ascensor, setAscensor] = useState(propiedad?.ascensor ?? false);
  const [piscina, setPiscina] = useState(propiedad?.piscina ?? false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    try {
      const uploaded = await Promise.all(
        acceptedFiles.map(async (file) => {
          const url = await uploadImagen(file);
          return { id: url, file, preview: URL.createObjectURL(file), url };
        })
      );
      setImages((prev) => [...prev, ...uploaded]);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple: true,
  });

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img?.file) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleSubmit = async (formData: FormData) => {
    // Inject controlled values into FormData
    formData.set("tipo", tipo);
    formData.set("operacion", operacion);
    formData.set("estado", estado);
    formData.set("municipio", municipio);
    formData.set("certificado_energetico", certEnergetico);
    formData.set("garaje", garaje);
    formData.set("orientacion", orientacion);
    formData.set("trastero", String(trastero));
    formData.set("ascensor", String(ascensor));
    formData.set("piscina", String(piscina));

    // Inject selected features
    selectedFeatures.forEach((f) => formData.append("caracteristicas", f));

    // Inject uploaded image URLs
    const urls = images.filter((i) => i.url).map((i) => i.url!);
    formData.set("imagenes", JSON.stringify(urls));

    await (action ?? crearPropiedad)(formData);
  };

  return (
    <form action={handleSubmit} className="max-w-4xl">
      <FieldGroup className="gap-6">
        {/* Basic Info */}
        <div className="grid gap-6 md:grid-cols-2">
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="titulo">Título</FieldLabel>
            <Input
              id="titulo"
              name="titulo"
              defaultValue={propiedad?.titulo}
              placeholder="Ej: Piso luminoso en el centro de Valencia"
              className="bg-white"
              required
            />
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel htmlFor="descripcion">Descripción</FieldLabel>
            <Textarea
              id="descripcion"
              name="descripcion"
              defaultValue={propiedad?.descripcion}
              placeholder="Descripción detallada de la propiedad..."
              rows={5}
              className="bg-white resize-none"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="precio">Precio (€)</FieldLabel>
            <Input
              id="precio"
              name="precio"
              type="number"
              defaultValue={propiedad?.precio}
              placeholder="250000"
              className="bg-white"
              required
            />
          </Field>

          <Field>
            <FieldLabel>Tipo</FieldLabel>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Operación</FieldLabel>
            <Select value={operacion} onValueChange={setOperacion}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Seleccionar operación" />
              </SelectTrigger>
              <SelectContent>
                {operationTypes.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Estado</FieldLabel>
            <Select value={estado} onValueChange={(v) => setEstado(v as typeof estado)}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field className="flex items-center gap-3 pt-6">
            <Checkbox
              id="destacado"
              name="destacado"
              defaultChecked={propiedad?.destacado}
              onCheckedChange={(checked) => {
                const input = document.getElementById("destacado-hidden") as HTMLInputElement;
                if (input) input.value = String(checked);
              }}
            />
            <FieldLabel htmlFor="destacado" className="cursor-pointer">
              Propiedad destacada
            </FieldLabel>
            <input type="hidden" id="destacado-hidden" name="destacado" value={String(propiedad?.destacado ?? false)} />
          </Field>
        </div>

        {/* Location */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Ubicación</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="municipio_input">Municipio</FieldLabel>
              <Input
                id="municipio_input"
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
                placeholder="Ej: Valencia, Alicante, Benidorm..."
                className="bg-white"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="direccion">Dirección</FieldLabel>
              <Input
                id="direccion"
                name="direccion"
                defaultValue={propiedad?.direccion}
                placeholder="Calle, número..."
                className="bg-white"
              />
            </Field>
          </div>
        </div>

        {/* Details */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Medidas y planta</h3>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            <Field>
              <FieldLabel htmlFor="metros_cuadrados">m² útiles</FieldLabel>
              <Input
                id="metros_cuadrados"
                name="metros_cuadrados"
                type="number"
                defaultValue={propiedad?.metros_cuadrados}
                placeholder="80"
                className="bg-white"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="habitaciones">Habitaciones</FieldLabel>
              <Input
                id="habitaciones"
                name="habitaciones"
                type="number"
                defaultValue={propiedad?.habitaciones}
                placeholder="3"
                className="bg-white"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="banos">Baños</FieldLabel>
              <Input
                id="banos"
                name="banos"
                type="number"
                defaultValue={propiedad?.banos}
                placeholder="2"
                className="bg-white"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="planta">Planta</FieldLabel>
              <Input
                id="planta"
                name="planta"
                defaultValue={propiedad?.planta}
                placeholder="Ej: 3ª, Bajo, Ático"
                className="bg-white"
              />
            </Field>
          </div>
        </div>

        {/* Structured extras */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Detalles adicionales</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <Field>
              <FieldLabel>Certificado energético</FieldLabel>
              <Select value={certEnergetico} onValueChange={setCertEnergetico}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {energyCerts.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Garaje</FieldLabel>
              <Select value={garaje} onValueChange={setGaraje}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {garageOptions.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Orientación</FieldLabel>
              <Select value={orientacion} onValueChange={setOrientacion}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {orientacionOptions.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="antiguedad">Año de construcción</FieldLabel>
              <Input
                id="antiguedad"
                name="antiguedad"
                type="number"
                defaultValue={propiedad?.antiguedad}
                placeholder="2005"
                min={1900}
                max={new Date().getFullYear()}
                className="bg-white"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="terraza_m2">Terraza (m²)</FieldLabel>
              <Input
                id="terraza_m2"
                name="terraza_m2"
                type="number"
                defaultValue={propiedad?.terraza_m2}
                placeholder="20"
                className="bg-white"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="jardin_m2">Jardín (m²)</FieldLabel>
              <Input
                id="jardin_m2"
                name="jardin_m2"
                type="number"
                defaultValue={propiedad?.jardin_m2}
                placeholder="50"
                className="bg-white"
              />
            </Field>
          </div>

          {/* Boolean extras */}
          <div className="mt-4 flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={trastero} onCheckedChange={(v) => setTrastero(!!v)} />
              <span className="text-sm">Trastero</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={ascensor} onCheckedChange={(v) => setAscensor(!!v)} />
              <span className="text-sm">Ascensor</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={piscina} onCheckedChange={(v) => setPiscina(!!v)} />
              <span className="text-sm">Piscina</span>
            </label>
          </div>
        </div>

        {/* Amenities */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Equipamiento y extras</h3>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
            {amenities.map((feature) => (
              <label key={feature} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedFeatures.includes(feature)}
                  onCheckedChange={() => toggleFeature(feature)}
                />
                <span className="text-sm">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Fotografías</h3>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            {uploading ? (
              <p className="text-sm text-muted-foreground">Subiendo imágenes...</p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  {isDragActive ? "Suelta las imágenes aquí..." : "Arrastra imágenes aquí, o haz clic para seleccionar"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WEBP (máx. 10MB cada una)</p>
              </>
            )}
          </div>

          {images.length > 0 && (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={images.map((i) => i.id)} strategy={rectSortingStrategy}>
                <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((image, index) => (
                    <SortableImage
                      key={image.id}
                      image={image}
                      index={index}
                      onRemove={removeImage}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Submit */}
        <div className="border-t border-border pt-6 flex gap-3">
          <Button type="submit" className="bg-navy hover:bg-navy/90" disabled={uploading}>
            {propiedad ? "Guardar cambios" : "Crear propiedad"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
