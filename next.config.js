const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'next_db_user',
        mongodb_password: '7ReIf1Y3mekxypNg',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'next-auth-dev',
      },
    }
  }

  return {
    env: {
      mongodb_username: 'next_db_user',
      mongodb_password: '7ReIf1Y3mekxypNg',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'next-auth',
    },
  }
}
