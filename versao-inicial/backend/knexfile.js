// Update with your config settings.

module.exports = {
    client: 'postgresql',
    connection: {
      host : '172.18.0.2',
      port: 5432,
      database: 'knowledge',
      user:     'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
