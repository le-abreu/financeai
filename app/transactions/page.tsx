import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

interface TransactionsPageProps {
  searchParams: {
    month: string;
    year: string;
  };
}

const TransactionsPage = async ({
  searchParams: { month, year },
}: TransactionsPageProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  const yearIsInvalid = !year || !isMatch(year, "yyyy");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}&year=${year}`);
  }
  if (yearIsInvalid) {
    redirect(`?month=${month}&year=${new Date().getFullYear()}`);
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: new Date(`${year}-${month}-01`),
        lt: new Date(`${year}-${month}-31`),
      },
    },
  });
  return (
    <>
      <Navbar />
      <div className="space-y-6 overflow-hidden p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <div className="flex justify-between space-x-4">
            <TimeSelect />
            <AddTransactionButton />
          </div>
        </div>
        <ScrollArea>
          <DataTable columns={transactionColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
