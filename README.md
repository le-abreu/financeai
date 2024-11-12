This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Para rodar local stripe
/home/leandroabreuferreira/Develop/tools/stripe/stripe_1.21.11_linux_x86_64
./stripe login
./stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
pegar o codigo que vai gerar e setar no env STRIPE_WEBHOOK_SECRET

Rodar docker compose
docker-compose up -d

Base neon
https://console.neon.tech/app/projects/super-block-31044818/branches/br-aged-sun-a5lnigh7/tables?database=neondb

Eraser
https://app.eraser.io/dashboard/all

Prisma para migrate
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql

Sharedcn template
https://ui.shadcn.com/

clerk login
https://dashboard.clerk.com/

stripe
https://dashboard.stripe.com/

openapi
https://platform.openai.com/

vercel ambiente prd
https://vercel.com/

link de prd
https://financeai-taupe.vercel.app/?month=11&year=2024
