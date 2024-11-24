# Variables
$DB_NAME = "qsr_platform"
$DB_USER = "postgres"
$DB_PASSWORD = "password"

Write-Host "Starting PostgreSQL setup for Windows..."

# Step 1: Check if PostgreSQL is installed
if (-Not (Get-Command psql -ErrorAction SilentlyContinue)) {
    Write-Host "PostgreSQL not found. Please install PostgreSQL from https://www.postgresql.org/download/."
    Exit
} else {
    Write-Host "PostgreSQL is already installed."
}

# Step 2: Start PostgreSQL service
Write-Host "Starting PostgreSQL service..."
Start-Service -Name "postgresql-x64-17" -ErrorAction SilentlyContinue

# Wait for the service to start
Start-Sleep -Seconds 5

# Step 3: Create database and user
Write-Host "Configuring PostgreSQL database and user..."
$psqlCommand = @"
CREATE DATABASE $DB_NAME;

DO \$\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE rolname = '${DB_USER}'
   ) THEN
      CREATE ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASSWORD}';
   END IF;
END
\$\$;

GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
"@

# Execute the SQL command
psql -U postgres -c "${psqlCommand}"

# Step 4: Test connection
Write-Host "Testing connection to PostgreSQL..."
try {
    psql -U ${DB_USER} -d ${DB_NAME} -c "\l" | Out-Null
    Write-Host "Connection successful! Your DATABASE_URL is:"
    Write-Host "postgresql://${DB_USER}:${DB_PASSWORD}@localhost/${DB_NAME}"
} catch {
    Write-Host "Connection failed. Please check your setup."
}

Write-Host "PostgreSQL setup complete!"
