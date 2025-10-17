"use client";

import { useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppleHelloEnglishEffect } from "@/components/ui/shadcn-io/apple-hello-effect";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";

export default function Page() {
  // Estado para los ficheros seleccionados
  const [files, setFiles] = useState<File[] | undefined>(undefined);

  // Handler para onDrop (lo que pasas a Dropzone)
  const handleDrop = (accepted: File[]) => {
    setFiles(accepted);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
              <AppleHelloEnglishEffect />
            </div>

            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />

            <div className="bg-muted/50 aspect-video rounded-xl p-4">
              <Dropzone
                accept={{ "image/*": [] }}
                maxFiles={10}
                maxSize={1024 * 1024 * 10}
                minSize={1024}
                onDrop={(accepted, rejections) => {
                  if (rejections.length) {
                    console.error(
                      rejections[0]?.errors[0]?.message ?? "Invalid file(s)"
                    );
                    return;
                  }
                  handleDrop(accepted);
                }}
                onError={(e) => console.error(e)}
                src={files}
                className="h-full"
              >
                {/* IMPORTANTe: estos van DENTRO como children */}
                <DropzoneContent />
                <DropzoneEmptyState />
              </Dropzone>
            </div>
          </div>

          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
