/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@sem-recaida/shared", "@sem-recaida/ai", "@sem-recaida/ui"],
};

export default nextConfig;
