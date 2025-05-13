import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: "index.html", // 기본 index.html

        // 필요한 다른 HTML 파일을 여기에 추가
        main: "src/pages/main.html", // 추가 HTML 파일
        result: "src/pages/result.html", // 추가 HTML 파일
      },
    },
  },
  appType: "mpa", // fallback 사용안함
});
