import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import BaseDatabaseProvider from '../../core/services/databaseprovider/BaseDatabaseProvider ';
import { ObjectWithId } from '../../core/services/databaseprovider/ReturnTypes';
import { randomUUID } from 'crypto';
import { Logger } from '../../core/utils/logger';
import { FilterType } from '../../core/services/databaseprovider/filterType';

export class DatabaseProvider implements BaseDatabaseProvider {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async fullTextSearch<T>(
    collectionName: string,
    searchText: string
  ): Promise<T[]> {
    const searchQuery = query(
      collection(this.db, collectionName),
      where('searchableText', 'array-contains', searchText)
    );
    const querySnapshot = await getDocs(searchQuery);
    const results: T[] = [];

    querySnapshot.forEach((doc) => {
      results.push(doc.data() as T);
    });

    return results;
  }

  async insert(collection: string, document: object): Promise<boolean> {
    try {
      await setDoc(doc(this.db, collection), document);
      Logger.info('inserted a document in: ' + collection);

      return true;
    } catch (error) {
      Logger.error(error as string);
      return false;
    }
  }

  async insertWithId(collection: string, document: object): Promise<string> {
    const id = randomUUID();

    try {
      await setDoc(doc(this.db, collection, id), document);

      Logger.info(`inserted {${id}} in: ` + collection);

      return id;
    } catch (error) {
      Logger.error(error as string);
      return Promise.reject(error);
    }
  }

  async find<T>(collection: string, docId: string): Promise<T | null> {
    const docRef = doc(this.db, collection, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      Logger.error(`Document {${docId}} Does not exist`);
      return null;
    }
  }

  async hasAny(collectionRef: string): Promise<boolean> {
    const querySnapshot = await getDocs(collection(this.db, collectionRef));
    return !querySnapshot.empty;
  }

  async update(
    collectionRef: string,
    docId: string,
    document: object
  ): Promise<boolean> {
    try {
      const documentRef = doc(this.db, collectionRef, docId);
      await updateDoc(documentRef, document);

      Logger.info(`Document {${docId}} updated successfully`);
      return true;
    } catch (error) {
      Logger.error(`Error updating document {${docId}} with an error: `);
      return false;
    }
  }

  async getAll<T>(collectionName: string): Promise<ObjectWithId<T>[]> {
    let collectionRef = collection(this.db, collectionName);

    const searchQuery = query(collectionRef);

    const querySnapshot = await getDocs(searchQuery);
    const results: ObjectWithId<T>[] = [];

    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() } as ObjectWithId<T>);
    });

    return results;
  }

  async getFirst<T>(
    collection: string,
    docId: string
  ): Promise<ObjectWithId<T> | null> {
    const results = await this.getAll<T>(collection);

    if (results.length === 0) {
      Logger.error('getFirst failed');
      return null;
    }

    return results[0];
  }

  async deleteOne(collectionRef: string, docRef: string): Promise<void> {
    try {
      await deleteDoc(doc(this.db, collectionRef, docRef));
      Logger.info(`deleted a document in: {${docRef}} ${collection}`);
    } catch (error) {
      Logger.error(error as string);
    }
  }

  async deleteAll(collectionRef: string): Promise<void> {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.db, collectionRef))
      );

      if (querySnapshot.empty) {
        Logger.error('deleteAll failed');
        return;
      }

      const batch = writeBatch(this.db);

      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      Logger.info('deleted all documents in: ' + collection);
    } catch (error) {
      Logger.error(error as string);
    }
  }
}
