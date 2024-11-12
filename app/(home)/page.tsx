import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "@/app/_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";
interface HomeProps {
  searchParams: {
    month: string;
    year: string;
  };
}

const Home = async ({ searchParams: { month, year } }: HomeProps) => {
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

  const dashboard = await getDashboard(month, year);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <AiReportButton
              month={month}
              year={year}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <TimeSelect basePath="/" />
          </div>
        </div>
        <div className="grid h-full grid-cols-1 gap-6 overflow-hidden md:grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              month={month}
              year={year}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="flex flex-col gap-6 overflow-hidden sm:grid sm:grid-cols-3 sm:gap-6">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>

          <LastTransactions
            lastTransactions={dashboard.lastTransactions}
            searchParams={{ month, year }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
