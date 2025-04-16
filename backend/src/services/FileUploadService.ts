import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Create a function to get the upload middleware
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/projects",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  } as any,
});

// Create and export multer upload instance
export const upload = multer({ storage: storage });

// Helper function to delete images from Cloudinary
export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};

// Helper function to extract public_id from Cloudinary URL
export const getPublicIdFromUrl = (url: string) => {
  const matches = url.match(/\/v\d+\/([^/]+)\.\w+$/);
  return matches ? matches[1] : null;
};
