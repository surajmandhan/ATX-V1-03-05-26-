import { v2 as cloudinary } from "cloudinary";

import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization"); const userId = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "not Authorized" });
    }

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price"); // This will be the string like "$50"
    const size = formData.get("size");
    const slug = formData.get("slug") || name.toLowerCase().replace(/ /g, '-');
    const fullDescription = formData.get("fullDescription");
    const benefits = formData.get("benefits") ? JSON.parse(formData.get("benefits")) : [];
    const usage = formData.get("usage");
    const storage = formData.get("storage");
    const id = formData.get("id") || Math.floor(Math.random() * 1000).toString();
    const files = formData.getAll("images");
    let result = [];

    if (files && files.length > 0) {
      result = await Promise.all(
        files.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { resource_type: "auto" },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );

            stream.end(buffer);
          });
        })
      );
    }

    const image = result.length > 0 ? result[0].secure_url : formData.get("image");

    const { data: newProduct, error } = await supabase
      .from('products')
      .insert({
        id,
        name,
        description,
        category,
        price, // Store as string
        size,
        slug,
        full_description: fullDescription,
        benefits,
        usage,
        storage,
        image, // Store single image URL as string
      })
      .select()
      .single();

    if (error) throw error;

    const numericPrice = Number(newProduct.price?.replace(/[^0-9.]/g, '')) || 0;

    return NextResponse.json({
      success: true,
      message: "Uploaded successfully",
      newProduct: {
        ...newProduct,
        _id: newProduct.id,
        offerPrice: numericPrice,
        price: numericPrice,
        displayPrice: newProduct.price,
        fullDescription: newProduct.full_description,
        image: [newProduct.image]
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
