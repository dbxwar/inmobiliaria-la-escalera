"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { eliminarPropiedad } from "@/lib/actions";
import { Propiedad } from "@/lib/supabase";

const statusConfig = {
  activo: { label: "Activo", className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" },
  vendido: { label: "Vendido", className: "bg-navy/10 text-navy hover:bg-navy/10" },
  alquilado: { label: "Alquilado", className: "bg-gold/20 text-gold hover:bg-gold/20" },
  reservado: { label: "Reservado", className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" },
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function PropertiesTable({ propiedades }: { propiedades: Propiedad[] }) {
  return (
    <div className="rounded-sm border border-border bg-card">
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px]">Foto</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Zona</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[100px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propiedades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  No hay propiedades. Crea la primera.
                </TableCell>
              </TableRow>
            ) : (
              propiedades.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="relative h-12 w-16 overflow-hidden rounded-sm bg-muted">
                      {property.imagenes?.[0] ? (
                        <Image
                          src={property.imagenes[0]}
                          alt={property.titulo}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-[#DDD8CE]" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{property.titulo}</TableCell>
                  <TableCell className="text-muted-foreground">{property.municipio}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatPrice(property.precio)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusConfig[property.estado]?.className}
                    >
                      {statusConfig[property.estado]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        asChild
                      >
                        <Link href={`/admin/editar/${property.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar esta propiedad?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-white hover:bg-destructive/90"
                              onClick={async () => await eliminarPropiedad(property.id)}
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden divide-y divide-border">
        {propiedades.map((property) => (
          <div key={property.id} className="flex items-start gap-3 p-4">
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm bg-muted">
              {property.imagenes?.[0] ? (
                <Image src={property.imagenes[0]} alt={property.titulo} fill className="object-cover" />
              ) : (
                <div className="h-full w-full bg-[#DDD8CE]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{property.titulo}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{property.municipio}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-semibold text-sm">{formatPrice(property.precio)}</span>
                <Badge variant="secondary" className={`text-xs ${statusConfig[property.estado]?.className}`}>
                  {statusConfig[property.estado]?.label}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/editar/${property.id}`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={async () => await eliminarPropiedad(property.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
}
