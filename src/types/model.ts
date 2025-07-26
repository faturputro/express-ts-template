import { Model } from 'sequelize-typescript';

type BaseModel<T extends Model> = {
  // biome-ignore lint/complexity/noBannedTypes: dynamic sequelize methods
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
}

/**
 * A generic Data Transfer Object (DTO) type that extracts only the user-defined,
 * non-function, non-Sequelize-internal properties from a Sequelize Model class.
 *
 * This is useful for shaping clean response objects or for DTO validation layers
 * without including Sequelize's methods or metadata like `save`, `toJSON`, etc.
 *
 * @template T - The Sequelize Model class to extract fields from.
 *
 * @example
 * type TempNetworkAssignmentDTO = ModelDTO<TempNetworkAssignment>;
 * // Resulting type:
 * // {
 * //   id: number;
 * //   network_name: string;
 * //   leader_id: number;
 * //   status: number;
 * //   created_at: Date;
 * //   updated_at: Date | null;
 * //   deleted_at: Date | null;
 * // }
 */
export type ModelDTO<T extends Model> = Omit<BaseModel<T>, '_model' | 'isNewRecord' | '_attributes' | '_creationAttributes' | 'sequelize' | 'created_at' | 'deleted_at'>;
