// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... tes autres options Next.js

  images: {
    // liste blanche des hôtes autorisés pour <Image src="https://…" />
    domains: [
      "lh3.googleusercontent.com",
      // ajoute ici d’autres domaines externes si besoin
    ],
    // ou, si tu préfères être plus fin :
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'lh3.googleusercontent.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;
