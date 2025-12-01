# MySQL Setup Guide

This guide will help you set up MySQL for the JV Envision Photography backend.

## 🚀 Quick Setup Options

### Option 1: Local MySQL Installation

1. **Install MySQL**
   - Windows: Download from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)
   - macOS: `brew install mysql`
   - Linux: `sudo apt-get install mysql-server` (Ubuntu/Debian)

2. **Start MySQL Service**
   - Windows: MySQL should start automatically, or use Services
   - macOS: `brew services start mysql`
   - Linux: `sudo systemctl start mysql`

3. **Set Root Password** (if not already set)
   ```bash
   mysql -u root
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password';
   ```

4. **Create Database**
   ```bash
   mysql -u root -p < server/schema.sql
   ```
   Or manually:
   ```sql
   CREATE DATABASE jv_envision_photography CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

5. **Configure .env File**
   ```bash
   cd server
   cp env.example .env
   ```

   Edit `.env` with your MySQL credentials:
   ```
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=your_actual_password
   MYSQL_DATABASE=jv_envision_photography
   ```

### Option 2: MySQL Without Password (Development Only)

If your MySQL root user has no password:

1. **Update .env**
   ```
   MYSQL_PASSWORD=
   ```
   (Leave it empty)

2. **Create Database**
   ```bash
   mysql -u root < server/schema.sql
   ```

### Option 3: Docker MySQL (Recommended for Development)

1. **Run MySQL Container**
   ```bash
   docker run --name jv-mysql \
     -e MYSQL_ROOT_PASSWORD=rootpassword \
     -e MYSQL_DATABASE=jv_envision_photography \
     -p 3306:3306 \
     -d mysql:8.0
   ```

2. **Update .env**
   ```
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=rootpassword
   MYSQL_DATABASE=jv_envision_photography
   ```

3. **Run Schema**
   ```bash
   docker exec -i jv-mysql mysql -uroot -prootpassword < server/schema.sql
   ```

### Option 4: Cloud MySQL (Production)

1. **Use MySQL-Compatible Services:**
   - AWS RDS MySQL
   - Google Cloud SQL
   - Azure Database for MySQL
   - PlanetScale
   - Railway MySQL

2. **Get Connection Details** from your provider

3. **Update .env** with cloud credentials:
   ```
   MYSQL_HOST=your-cloud-host.com
   MYSQL_PORT=3306
   MYSQL_USER=your_username
   MYSQL_PASSWORD=your_secure_password
   MYSQL_DATABASE=jv_envision_photography
   MYSQL_SSL=true  # Usually required for cloud
   ```

## 🔧 Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"

**Solutions:**
1. Check if password is correct in `.env`
2. If no password, set `MYSQL_PASSWORD=` (empty)
3. Reset MySQL root password:
   ```bash
   mysql -u root
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
   ```
4. Create a new MySQL user:
   ```sql
   CREATE USER 'jvuser'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON jv_envision_photography.* TO 'jvuser'@'localhost';
   FLUSH PRIVILEGES;
   ```
   Then use `jvuser` in `.env`

### Error: "Can't connect to MySQL server"

**Solutions:**
1. Check if MySQL is running:
   - Windows: Check Services
   - macOS: `brew services list`
   - Linux: `sudo systemctl status mysql`
2. Verify port 3306 is not blocked
3. Check firewall settings

### Error: "Unknown database 'jv_envision_photography'"

**Solution:**
```bash
mysql -u root -p < server/schema.sql
```

Or manually:
```sql
CREATE DATABASE jv_envision_photography CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## ✅ Verification

1. **Test Connection**
   ```bash
   mysql -u root -p -e "SHOW DATABASES;"
   ```

2. **Check Database**
   ```bash
   mysql -u root -p -e "USE jv_envision_photography; SHOW TABLES;"
   ```

3. **Start Server**
   ```bash
   cd server
   npm run dev
   ```

   You should see:
   ```
   ✅ MySQL connected successfully
   🛠️  Database schema verified
   🚀 Server running on port 5000
   ```

## 🎯 Development Mode (No Database)

If you want to develop without MySQL:

1. **Don't create .env file** or leave MySQL credentials incorrect
2. **Server will start** in development mode
3. **Contact form submissions** will be logged to console only
4. **No data persistence** - data is lost on server restart

This is useful for:
- Frontend development
- Testing without database setup
- Quick prototyping

## 📝 Next Steps

Once MySQL is configured:

1. ✅ Server starts with database connection
2. ✅ Contact form saves to database
3. ✅ Data persists across server restarts
4. ✅ Ready for production deployment

---

**Need Help?** Check the main README.md or open an issue.



