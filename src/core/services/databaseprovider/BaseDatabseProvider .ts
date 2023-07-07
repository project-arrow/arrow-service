import { ObjectWithId } from './ReturnTypes';

export default interface BaseDatabaseProvider {
  /**
   * Inserts a document into the db
   * @param collection
   * @param document
   */
  insert(collection: string, document: object): Promise<boolean>;

  insertWithId(collection: string, document: object): Promise<string>;

  /**
   * Finds a document
   * @param collection
   * @param document
   */
  find<T>(collection: string, document: object): Promise<T | null>;

  /**
   * Checks if there's an item in collection.
   * @param collection
   */
  hasAny(collection: string): Promise<boolean>;

  /**
   * Updates specific collection
   * @param collection
   * @param filter
   * @param document
   */
  update(
    collection: string,
    filter: object,
    document: object
  ): Promise<boolean>;

  /**
   * Gets all item within the collection
   * @param collection
   * @param filters
   */
  getAll<T>(collection: string, filters: object): Promise<ObjectWithId<T>[]>;

  getFirst<T>(
    collection: string,
    filters: object
  ): Promise<ObjectWithId<T> | null>;

  deleteOne(collection: string, filters: object): Promise<void>;

  deleteAll(collection: string, filters: object): Promise<void>;
}
