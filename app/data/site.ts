export const SITE = {
  name: "Alexandre Artus",
  email: "artusalexandre74@gmail.com",
  location: "Paris, France",
  // Web3Forms access key (NEXT_PUBLIC_WEB3FORMS_KEY in .env.local / Netlify env vars)
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
  socials: {
    github: "https://github.com/alexarts74",
    linkedin: "https://www.linkedin.com/in/alexandre-artus-27a71b1a4/",
  },
} as const;
