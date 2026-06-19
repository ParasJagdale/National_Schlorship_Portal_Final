export const proxyConfig = {
  "/api": {
    target: "http://localhost:5174",
    changeOrigin: true,
    configure: (proxy, _options) => {
      proxy.on("error", (err, _req, _res) => {
        console.log("Vite Proxy Error:", err);
      });
    },
  },
};
