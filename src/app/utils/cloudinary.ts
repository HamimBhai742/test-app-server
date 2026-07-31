import { v2 as cloudinary } from "cloudinary";
import config from "../../config";

if (config.cloudinary.cloud_name && config.cloudinary.api_key && config.cloudinary.api_secret) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
  });
}

export const uploadToCloudinary = async (
  fileBase64: string,
  folder = "hisab_kitab/avatars"
): Promise<string> => {
  // If Cloudinary keys are configured, upload to Cloudinary
  if (config.cloudinary.cloud_name && config.cloudinary.api_key && config.cloudinary.api_secret) {
    try {
      const result = await cloudinary.uploader.upload(fileBase64, {
        folder,
        resource_type: "auto",
      });
      if (result && result.secure_url) {
        return result.secure_url;
      }
    } catch (error) {
      console.error("Cloudinary SDK Upload Error:", error);
    }
  }

  // Attempt Cloudinary Unsigned upload if cloud_name is present
  if (config.cloudinary.cloud_name) {
    try {
      const formData = new URLSearchParams();
      formData.append("file", fileBase64);
      formData.append("upload_preset", config.cloudinary.upload_preset || "ml_default");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${config.cloudinary.cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = (await response.json()) as any;
      if (data && data.secure_url) {
        return data.secure_url;
      }
    } catch (e) {
      console.warn("Cloudinary REST Unsigned upload error:", e);
    }
  }

  // Fallback: return image base64 / url as-is if Cloudinary is not yet configured
  return fileBase64;
};

export default cloudinary;
