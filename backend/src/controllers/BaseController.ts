import { Request, Response } from "express";
import { Model, Document } from "mongoose";

export default class BaseController<T extends Document> {
  constructor(private model: Model<T>) {}

  // Get all items
  getAll = async (req: Request, res: Response) => {
    try {
      const items = await this.model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching items", error });
    }
  };

  // Get single item by ID
  getById = async (req: Request, res: Response) => {
    try {
      const item = await this.model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Error fetching item", error });
    }
  };

  // Create new item
  create = async (req: Request, res: Response) => {
    try {
      const newItem = new this.model(req.body);
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(400).json({ message: "Error creating item", error });
    }
  };

  // Update item
  update = async (req: Request, res: Response) => {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: "Error updating item", error });
    }
  };

  // Delete item
  delete = async (req: Request, res: Response) => {
    try {
      const deletedItem = await this.model.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting item", error });
    }
  };
}
