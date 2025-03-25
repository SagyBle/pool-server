import mongoose, { Model, Document, FilterQuery } from "mongoose";

class MongoDbService {
  /**
   * Connect to MongoDB
   */
  static async connect(uri: string): Promise<void> {
    await mongoose
      .connect(uri, {} as mongoose.ConnectOptions)
      .then(() => {
        console.log("✅ Connected to MongoDB");
      })
      .catch((err) => console.error("MongoDB connection error:", err));
  }

  /**
   * Create a new document in the collection
   */
  static async create<T extends Document>(
    model: Model<any>,
    data: Partial<T>
  ): Promise<T | null> {
    try {
      const document = await model.create(data);
      return document;
    } catch (error) {
      console.error("❌ Error creating document:", error);
      return null;
    }
  }

  /**
   * Get a document by ID
   */
  static async getById<T extends Document>(
    model: Model<T>,
    id: string
  ): Promise<T | null> {
    try {
      return await model.findById(id);
    } catch (error) {
      console.error("❌ Error fetching document by ID:", error);
      return null;
    }
  }

  /**
   * Get all documents from a collection
   */
  static async getAll<T extends Document>(model: Model<T>): Promise<T[]> {
    try {
      return await model.find();
    } catch (error) {
      console.error("❌ Error fetching documents:", error);
      return [];
    }
  }

  /**
   * Get documents by filter (Find where ...) with optional limit
   */
  static async getByBody<T extends Document>(
    model: Model<T>,
    filter: FilterQuery<T>,
    limit?: number // ✅ Optional limit parameter
  ): Promise<T[]> {
    try {
      const query = model.find(filter);

      if (limit) {
        query.limit(limit); // ✅ Apply limit if provided
      }

      return await query.exec();
    } catch (error) {
      console.error("❌ Error fetching documents by filter:", error);
      return [];
    }
  }

  /**
   * Get documents by filter (Merges `instantFilters` and `persistentFilters`)
   */
  // static async getByBody<T extends Document>(
  //   model: Model<T>,
  //   instantFilters: FilterQuery<T>,
  //   persistentFilterId?: string,
  //   limit?: number
  // ): Promise<T[]> {
  //   try {
  //     // Retrieve persistent filter if `persistentFilterId` is provided
  //     const persistentFilter = await this.getPersistentFilter(
  //       persistentFilterId
  //     );

  //     // Merge both filters (instant + persistent)
  //     const mergedFilters = { ...persistentFilter, ...instantFilters };

  //     const query = model.find(mergedFilters);

  //     if (limit) {
  //       query.limit(limit);
  //     }

  //     return await query.exec();
  //   } catch (error) {
  //     console.error("❌ Error fetching documents by filter:", error);
  //     return [];
  //   }
  // }

  /**
   * Update a document by ID
   */
  static async updateById<T extends Document>(
    model: Model<T>,
    id: string,
    updateData: Partial<T>
  ): Promise<T | null> {
    try {
      return await model.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      console.error("❌ Error updating document:", error);
      return null;
    }
  }

  /**
   * Delete a document by ID
   */
  static async deleteById<T extends Document>(
    model: Model<T>,
    id: string
  ): Promise<boolean> {
    try {
      const result = await model.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      console.error("❌ Error deleting document:", error);
      return false;
    }
  }
}

export default MongoDbService;
