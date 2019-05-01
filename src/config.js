module.exports = {
  development: {
    grpcport: process.env.GRPCPORT || 8080,
    restport: process.env.RESTPORT || 8081,
    saltingRounds: 10
  }
};
