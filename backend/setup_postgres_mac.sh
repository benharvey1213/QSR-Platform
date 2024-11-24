#!/bin/bash

# Variables
DB_NAME="qsr_platform"
DB_USER="postgres"
DB_PASSWORD="password"

echo "Starting PostgreSQL setup for macOS..."

# Step 1: Install PostgreSQL if not already installed
if ! command -v psql &> /dev/null; then
  echo "PostgreSQL not found. Installing via Homebrew..."
  brew install postgresql
else
  echo "PostgreSQL is already installed."
fi

# Step 2: Start PostgreSQL service
echo "Starting PostgreSQL service..."
brew services start postgresql

# Step 3: Wait for the service to start
sleep 5

# Step 4: Create database and user
echo "Configuring PostgreSQL database and user..."
psql postgres <<EOF
-- Create database
CREATE DATABASE $DB_NAME;

-- Create user with password
DO \$\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE rolname = '$DB_USER'
   ) THEN
      CREATE ROLE $DB_USER WITH LOGIN PASSWORD '$DB_PASSWORD';
   END IF;
END
\$\$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOF

# Step 5: Test connection
echo "Testing connection to PostgreSQL..."
psql "postgresql://$DB_USER:$DB_PASSWORD@localhost/$DB_NAME" -c "\l" &> /dev/null
if [ $? -eq 0 ]; then
  echo "Connection successful! Your DATABASE_URL is:"
  echo "postgresql://$DB_USER:$DB_PASSWORD@localhost/$DB_NAME"
else
  echo "Connection failed. Please check your setup."
fi

echo "PostgreSQL setup complete!"
