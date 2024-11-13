"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const createStripeCheckout = async (code: string) => {
  const planPriceMap = new Map([
    ["mensal", process.env.STRIPE_PREMIUM_PLAN_PRICE_ID],
    ["anual", process.env.STRIPE_PREMIUM_PLAN_PRICE_ANUAL_ID],
    // Adicione outros planos aqui conforme necessário
  ]);

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  const priceId = planPriceMap.get(code);

  if (!priceId) {
    throw new Error(
      "Código de plano inválido ou Stripe price ID não encontrado",
    );
  }

  await clerkClient().users.updateUser(userId, {
    privateMetadata: {},
    publicMetadata: {
      subscriptionPlanType: code,
    },
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: process.env.APP_URL,
    cancel_url: process.env.APP_URL,
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
        plan_type: code,
      },
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });
  return { sessionId: session.id };
};
