module.exports = {
  env: {
    apiUrl: 'http://localhost:3001' // Override with remote URL
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  }
};