import BaseDatabaseProvider from '../services/databaseprovider/BaseDatabaseProvider ';
import { FilterType } from '../services/databaseprovider/filterType';

interface UpdatableObjectOf<T> {
  data: T;
}

export default abstract class BaseRepository<T> {
  protected readonly db: BaseDatabaseProvider;
  protected collectionPath: string;

  protected constructor(db: BaseDatabaseProvider) {
    this.db = db;
    this.collectionPath = '';
  }

  async add(data: T) {
    return await this.db.insertWithId(this.collectionPath, data as Object);
  }

  async update(docId: string, updates: UpdatableObjectOf<T>) {
    const fetchedData = await this.db.find<T>(this.collectionPath, docId);
    if (!fetchedData) return false;

    return this.db.update(this.collectionPath, docId, {
      data: {
        ...(fetchedData as any).data,
        ...updates.data,
      },
    });
  }

  async delete(docId: string) {
    return await this.db.deleteOne(this.collectionPath, docId);
  }

  async getOne(docId: string) {
    return await this.db.getFirst<T>(this.collectionPath, docId);
  }

  async getAll() {
    return await this.db.getAll<T>(this.collectionPath);
  }
}
