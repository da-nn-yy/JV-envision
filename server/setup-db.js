#!/usr/bin/env node

/**
 * MySQL Database Setup Script
 * Helps configure and test MySQL connection for JV Envision Photography
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function testConnection(config) {
  try {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password
    });

    await connection.query('SELECT 1');
    await connection.end();
    return { success: true, message: 'Connection successful!' };
  } catch (error) {
    return { success: false, message: error.message, code: error.code };
  }
}

async function createDatabase(config) {
  try {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password
    });

    const dbName = config.database.includes('-') ? `\`${config.database}\`` : config.database;
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.query(`USE ${dbName}`);

    // Read and execute schema
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema statements
    const statements = schema.split(';').filter(s => s.trim().length > 0);
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.query(statement);
        } catch (err) {
          // Ignore errors for IF NOT EXISTS statements
          if (!err.message.includes('already exists')) {
            console.warn('Warning:', err.message);
          }
        }
      }
    }

    await connection.end();
    return { success: true, message: 'Database and tables created successfully!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function main() {
  console.log('\n🔧 MySQL Database Setup for JV Envision Photography\n');
  console.log('This script will help you configure MySQL connection.\n');

  const config = {
    host: await question('MySQL Host [localhost]: ') || 'localhost',
    port: parseInt(await question('MySQL Port [3306]: ') || '3306'),
    user: await question('MySQL User [root]: ') || 'root',
    password: await question('MySQL Password (press Enter if no password): ') || '',
    database: await question('Database Name [jv-envision-photography]: ') || 'jv-envision-photography'
  };

  console.log('\n📡 Testing MySQL connection...');
  const testResult = await testConnection(config);

  if (!testResult.success) {
    console.error(`\n❌ Connection failed: ${testResult.message}`);
    if (testResult.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Common solutions:');
      console.error('   - Check if password is correct');
      console.error('   - If no password, leave it empty');
      console.error('   - Try resetting MySQL root password');
      console.error('   - Or create a new MySQL user with proper permissions\n');
    }
    rl.close();
    process.exit(1);
  }

  console.log(`✅ ${testResult.message}\n`);

  console.log('📦 Creating database and tables...');
  const dbResult = await createDatabase(config);

  if (!dbResult.success) {
    console.error(`\n❌ Database setup failed: ${dbResult.message}\n`);
    rl.close();
    process.exit(1);
  }

  console.log(`✅ ${dbResult.message}\n`);

  // Create .env file
  const envContent = `# MySQL Connection
MYSQL_HOST=${config.host}
MYSQL_PORT=${config.port}
MYSQL_USER=${config.user}
MYSQL_PASSWORD=${config.password}
MYSQL_DATABASE=${config.database}
MYSQL_CONNECTION_LIMIT=10

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:5173
`;

  const envPath = path.join(__dirname, '.env');
  fs.writeFileSync(envPath, envContent);

  console.log('✅ Created .env file with your MySQL credentials');
  console.log(`   Location: ${envPath}\n`);
  console.log('🚀 You can now start the server with: npm run dev\n');

  rl.close();
}

main().catch((error) => {
  console.error('Error:', error);
  rl.close();
  process.exit(1);
});


