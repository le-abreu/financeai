import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import TimeSelect from "@/app/_components/time-select";
import { isMatch } from "date-fns";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

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
  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="items-left flex w-full flex-col justify-between space-y-4 md:flex-row md:space-y-0">
          <h1 className="text-2xl font-bold">Transações</h1>
          <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <TimeSelect basePath="/transactions" />
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
        </div>
        <ScrollArea className="h-full">
          <DataTable columns={transactionColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
