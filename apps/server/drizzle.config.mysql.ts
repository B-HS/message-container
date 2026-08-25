import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'mysql',
    schema: './db/schema.mysql.ts',
    out: './drizzle/mysql',
})
