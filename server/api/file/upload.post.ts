import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    const body = await readBody(event);

    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    if (!body.image) {
      throw createError({
        statusCode: 400,
        statusMessage: "Image is required!",
      });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
      api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
    });

    const uploadImg = await cloudinary.uploader.upload(body.image, {
      overwrite: true,
      resource_type: "auto",
      filename_override: body.name,
    });

    return {
      url: uploadImg.secure_url,
      size: uploadImg.bytes,
    };
  } catch (error: any) {
    const errorMessage = error.error ? error.error.message : error.message;
    throw createError({
      statusCode: 400,
      statusMessage: `${errorMessage}!`,
    });
  }
});
