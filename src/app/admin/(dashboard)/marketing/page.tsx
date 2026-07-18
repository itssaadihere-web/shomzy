import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { saveFile } from '@/lib/upload';
import Image from 'next/image';

async function getMarketingConfig() {
  const filePath = path.join(process.cwd(), 'src/config/marketing.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function MarketingManager() {
  const config = await getMarketingConfig();

  async function updateMarketingConfig(formData: FormData) {
    "use server";
    
    // Helper to process uploaded file or fallback to existing
    const processImage = async (field: string, existingPath: string) => {
      const file = formData.get(field) as File;
      if (file && file.size > 0) {
        const newPath = await saveFile(file);
        if (newPath) return newPath;
      }
      return existingPath;
    };

    const newConfig = {
      heroBanner: {
        title: formData.get("heroTitle"),
        subtitle: formData.get("heroSubtitle"),
        buttonText: formData.get("heroButtonText"),
        buttonLink: formData.get("heroButtonLink"),
        image: await processImage("heroImage", config.heroBanner.image),
      },
      promo1: {
        title: formData.get("promo1Title"),
        subtitle: formData.get("promo1Subtitle"),
        image: await processImage("promo1Image", config.promo1.image),
      },
      promo2: {
        title: formData.get("promo2Title"),
        subtitle: formData.get("promo2Subtitle"),
        image: await processImage("promo2Image", config.promo2.image),
      },
      promo3: {
        title: formData.get("promo3Title"),
        subtitle: formData.get("promo3Subtitle"),
        image: await processImage("promo3Image", config.promo3.image),
      }
    };

    const filePath = path.join(process.cwd(), 'src/config/marketing.json');
    await fs.writeFile(filePath, JSON.stringify(newConfig, null, 2));
    
    revalidatePath("/");
    revalidatePath("/admin/marketing");
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-8">Marketing Banners Manager</h1>
      
      <form action={updateMarketingConfig} className="space-y-8">
        
        {/* Hero Banner Section */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Main Hero Banner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="heroTitle" defaultValue={config.heroBanner.title} className="mt-1 block w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image Upload</label>
              <div className="flex items-center space-x-4 mt-1">
                {config.heroBanner.image && (
                  <div className="relative w-12 h-12 border rounded bg-gray-50 flex-shrink-0">
                    <Image src={config.heroBanner.image} alt="Hero" fill className="object-cover" />
                  </div>
                )}
                <input type="file" name="heroImage" accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <input type="text" name="heroSubtitle" defaultValue={config.heroBanner.subtitle} className="mt-1 block w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Button Text</label>
              <input type="text" name="heroButtonText" defaultValue={config.heroBanner.buttonText} className="mt-1 block w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Button Link</label>
              <input type="text" name="heroButtonLink" defaultValue={config.heroBanner.buttonLink} className="mt-1 block w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        {/* Small Promos */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Small Promo Banners</h2>
          
          <div className="space-y-6">
            {/* Promo 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded border">
              <div>
                <label className="block text-sm font-medium text-gray-700">Promo 1 Subtitle</label>
                <input type="text" name="promo1Subtitle" defaultValue={config.promo1.subtitle} className="mt-1 block w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Promo 1 Title</label>
                <input type="text" name="promo1Title" defaultValue={config.promo1.title} className="mt-1 block w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image Upload</label>
                <div className="flex flex-col space-y-2 mt-1">
                  {config.promo1.image && (
                    <div className="relative w-full h-20 border rounded bg-white overflow-hidden">
                      <Image src={config.promo1.image} alt="Promo 1" fill className="object-contain" />
                    </div>
                  )}
                  <input type="file" name="promo1Image" accept="image/*" className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-50 file:text-brand-blue" />
                </div>
              </div>
            </div>

            {/* Promo 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded border">
              <div>
                <label className="block text-sm font-medium text-gray-700">Promo 2 Subtitle</label>
                <input type="text" name="promo2Subtitle" defaultValue={config.promo2.subtitle} className="mt-1 block w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Promo 2 Title</label>
                <input type="text" name="promo2Title" defaultValue={config.promo2.title} className="mt-1 block w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image Upload</label>
                <div className="flex flex-col space-y-2 mt-1">
                  {config.promo2.image && (
                    <div className="relative w-full h-20 border rounded bg-white overflow-hidden">
                      <Image src={config.promo2.image} alt="Promo 2" fill className="object-contain" />
                    </div>
                  )}
                  <input type="file" name="promo2Image" accept="image/*" className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-50 file:text-brand-blue" />
                </div>
              </div>
            </div>

            {/* Promo 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded border">
              <div>
                <label className="block text-sm font-medium text-gray-700">Promo 3 Subtitle</label>
                <input type="text" name="promo3Subtitle" defaultValue={config.promo3.subtitle} className="mt-1 block w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Promo 3 Title</label>
                <input type="text" name="promo3Title" defaultValue={config.promo3.title} className="mt-1 block w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image Upload</label>
                <div className="flex flex-col space-y-2 mt-1">
                  {config.promo3.image && (
                    <div className="relative w-full h-20 border rounded bg-white overflow-hidden">
                      <Image src={config.promo3.image} alt="Promo 3" fill className="object-contain" />
                    </div>
                  )}
                  <input type="file" name="promo3Image" accept="image/*" className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-50 file:text-brand-blue" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-brand-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md">
            Save Marketing Configuration
          </button>
        </div>

      </form>
    </div>
  );
}
