// Next.js 설정. 프로젝트 바깥의 config/ 폴더(codebase/config)를 빌드에 포함하기 위해 outputFileTracingRoot 지정.
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, ".."),
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
