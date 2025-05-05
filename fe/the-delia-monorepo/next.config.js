module.exports = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "http://localhost:3001", // Địa chỉ admin frontend
        permanent: false,
      },
      {
        source: "/",
        destination: "http://localhost:3000", // Địa chỉ users frontend
        permanent: false,
      },
    ];
  },
};
