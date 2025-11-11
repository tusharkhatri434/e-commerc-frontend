// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'dpl4fh2q8'; // Your cloud name from url-config
const CLOUDINARY_UPLOAD_PRESET = 'foerverBuy_preset'; // You'll need to create this in Cloudinary dashboard

/**
 * Upload image to Cloudinary
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The uploaded image URL
 */
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);
  formData.append('folder', 'products'); // Store in products folder

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param {FileList | File[]} files - Array of image files
 * @returns {Promise<string[]>} - Array of uploaded image URLs
 */
export const uploadMultipleToCloudinary = async (files) => {
  const uploadPromises = Array.from(files).map((file) =>
    uploadToCloudinary(file)
  );

  try {
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw error;
  }
};

/**
 * Delete image from Cloudinary (requires backend API)
 * Note: Direct deletion from frontend is not recommended for security
 * @param {string} publicId - The public ID of the image to delete
 */
export const deleteFromCloudinary = async (publicId) => {
  // This should be done from backend for security
  console.warn('Image deletion should be handled by backend API');
  return Promise.reject(
    'Image deletion must be handled through backend for security'
  );
};

