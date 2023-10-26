
CREATE DATABASE "martect_database"
    WITH OWNER "martectuser"
    ENCODING 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE template0;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
GRANT ALL PRIVILEGES ON DATABASE martect_database TO martectuser;