"use client";

import { jsPDF } from "jspdf";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
  year: string;
}

const AiReportButton = ({
  month,
  year,
  hasPremiumPlan,
}: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month, year });
      console.log({ aiReport });
      setReport(aiReport);
      if (aiReport) {
        downloadPdf(aiReport);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };

  const downloadPdf = (reportContent: string) => {
    if (!reportContent) return;

    const doc = new jsPDF();

    doc.text("Relatório Finance: IA", 20, 20); // Adjust position as necessary

    const margins = {
      top: 30,
      bottom: 20,
      left: 20,
      width: 180,
    };

    const lines: string[] = doc.splitTextToSize(reportContent, margins.width); // Explicitly declare lines as string[]
    let cursorY = margins.top + 10; // Initial vertical position after the title

    lines.forEach((line: string) => {
      // Removed the unused 'index' parameter
      if (cursorY + 10 > doc.internal.pageSize.height - margins.bottom) {
        doc.addPage();
        cursorY = margins.top; // Reset cursor Y to top margin
      }
      doc.text(line, margins.left, cursorY);
      cursorY += 10; // Increment position by line height
    });

    const now = new Date();
    const year = now.getFullYear(); // Get current year
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Get current month and ensure it is in two digits
    const fileName = `${year}_${month}_report_finance.pdf`; // Construct file name

    doc.save(fileName); // Save the PDF with a dynamic name
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReport(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <Markdown>{report}</Markdown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar relatório
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar relatórios com IA.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription">Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
