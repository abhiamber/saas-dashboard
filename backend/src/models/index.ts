import fs from "fs";
import path from "path";
import { Sequelize, DataTypes, ModelStatic, Model } from "sequelize";
import { DBModels } from "./types";

export let models = {} as DBModels;

export async function initializeModels(
  sequelize: Sequelize
): Promise<DBModels> {
  const files = fs.readdirSync(__dirname).filter(
    (file) =>
      file.endsWith(".ts") &&
      file !== "index.ts" &&
      file !== "types.ts"
  );

  const loadedModels: Record<string, ModelStatic<Model>> = {};
  for (const file of files) {
    const modelPath = path.join(__dirname, file);
    const module = await import(modelPath);

    if (!module.default) {
      console.error(`❌ Model file has no default export: ${file}`);
      continue;
    }
    const model = module.default({ sequelize, DataTypes });
    loadedModels[model.name] = model;
  }

  // 🔗 Run associations
  Object.values(loadedModels).forEach((model: any) => {
    if (typeof model.associate === "function") {
      model.associate(loadedModels);
    }
  });

  // ⭐ **THE IMPORTANT FIX**
  models = loadedModels as unknown as DBModels;

  return models;
}
