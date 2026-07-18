import fs from 'fs/promises';
import path from 'path';

export async function saveFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename using timestamp to prevent overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.name);
    const filename = `${file.name.replace(extension, '')}-${uniqueSuffix}${extension}`;
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, filename);

    // Ensure uploads directory exists (just in case)
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    await fs.writeFile(filePath, buffer);
    
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Error saving file:", error);
    return null;
  }
}
