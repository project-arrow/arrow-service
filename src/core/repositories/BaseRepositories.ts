import BaseDatabaseProvider from '../services/databaseprovider/BaseDatabseProvider ';

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

  async add(docId: string, data: T) {
    return await this.db.insertWithId(this.collectionPath, {
      docId: docId,
      data,
    });
  }

  async update(docId: string, updates: UpdatableObjectOf<T>) {
    const filters = {
      docId: docId,
    };

    const fetchedData = await this.db.find<T>(this.collectionPath, filters);
    if (!fetchedData) return false;

    return this.db.update(this.collectionPath, filters, {
      data: {
        ...(fetchedData as any).data,
        ...updates.data,
      },
    });
  }

  async delete(docId: string) {
    const filters = {
      docId: docId,
    };

    return await this.db.deleteOne(this.collectionPath, filters);
  }

  async getOne(docId: string) {
    const filters = {
      docId: docId,
    };

    return await this.db.getFirst<T>(this.collectionPath, filters);
  }

  async getAll() {
    return await this.db.getAll<T>(this.collectionPath, {});
  }
}
