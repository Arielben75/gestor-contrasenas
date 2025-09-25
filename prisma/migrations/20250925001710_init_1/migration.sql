/*
  Warnings:

  - Added the required column `salt` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Password" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "notas" TEXT,
    "esMaster" INTEGER NOT NULL DEFAULT 0,
    "salt" TEXT NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 1,
    "creadoEn" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME,
    CONSTRAINT "Password_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO "new_Password" ("actualizadoEn", "creadoEn", "esMaster", "estado", "id", "notas", "password", "titulo", "url", "usuario", "usuarioId") SELECT "actualizadoEn", "creadoEn", "esMaster", "estado", "id", "notas", "password", "titulo", "url", "usuario", "usuarioId" FROM "Password";
DROP TABLE "Password";
ALTER TABLE "new_Password" RENAME TO "Password";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
