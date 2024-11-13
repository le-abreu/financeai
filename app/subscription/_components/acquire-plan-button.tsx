"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface AcquirePlanButtonProps {
  code: string;
}

const AcquirePlanButton = ({ code }: AcquirePlanButtonProps) => {
  const { user } = useUser();
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout(code);
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripe) {
      throw new Error("Stripe not found");
    }
    await stripe.redirectToCheckout({ sessionId });
  };

  const hasPremiumPlanType = user?.publicMetadata.subscriptionPlanType === code;
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  if (hasPremiumPlan) {
    if (hasPremiumPlanType) {
      return (
        <Button className="w-full rounded-full font-bold" variant="link">
          <Link
            href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
          >
            Gerenciar plano
          </Link>
        </Button>
      );
    }
  } else {
    return (
      <Button
        className="w-full rounded-full font-bold"
        onClick={handleAcquirePlanClick}
      >
        Adquirir plano
      </Button>
    );
  }
  return;
};

export default AcquirePlanButton;
