import { ObjectWithId } from './ReturnTypes';
import { FilterType } from './filterType';

export default interface BaseDatabaseProvider {
  /**
   * Inserts a document into the db
   * @param collection
   * @param document
   */
  insert(collection: string, document: object): Promise<boolean>;

  insertWithId(collection: string, document: object): Promise<string>;

  /**
   * Finds a specific document
   * @param collection
   * @param document
   */
  find<T>(collection: string, document: string): Promise<T | null>;

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
  update(collection: string, docId: string, document: object): Promise<boolean>;

  /**
   * Gets all item within the collection
   * @param collection
   * @param filters
   */
  getAll<T>(collection: string): Promise<ObjectWithId<T>[]>;

  getFirst<T>(
    collection: string,
    docId: string
  ): Promise<ObjectWithId<T> | null>;

  deleteOne(collection: string, docId: string): Promise<void>;

  deleteAll(collection: string): Promise<void>;
}
