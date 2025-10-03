## Install deps: 
 npx create-next-app@latest terrashare --typescript --tailwind --app --no-src-dir 

### Database & ORM
```
npm install @prisma/client prisma
npm install -D @types/node
```

### macOS with Homebrew
```
brew install postgresql@15
brew services start postgresql@15
```
### Create database
```
psql postgres
CREATE DATABASE terrashare_dev;
\q
```

## Environment Configuration

env# Database
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/terrashare_dev?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Initialize Prisma

```
npx prisma init
npx prisma generate
npx prisma migrate dev --name init
```
### Seed the database
```
npx prisma db seed
```
