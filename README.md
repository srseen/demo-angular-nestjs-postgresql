# Office Equipment CRUD System

## A fullstack CRUD system built with:

- 🌐 Angular (Client)
- 🚀 NestJS (Server)
- 🐘 PostgreSQL (Database)
- 🐳 Docker Compose (Environment)

# office-equipment-crud/

├── client/ # Angular frontend<br>
├── server/ # NestJS backend<br>
├── .env # Environment variables<br>
├── docker-compose.yml<br>
└── README.md<br>

## How to clone

```
git clone https://github.com/srseen/demo-angular-nestjs-postgresql.git
```

## ▶️ How to Run

1. สร้างไฟล์ `.env` ไว้ level เดียวกับ docker-compose.yml

```
# PostgreSQL configuration
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

# pgAdmin configuration
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=

# Database connection settings
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
```

2. รันคำสั่ง:

```bash
docker-compose up --build
```
