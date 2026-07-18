import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

async function getAdminConfig() {
  try {
    const configPath = path.join(process.cwd(), "src/config/admin.json");
    const configData = await fs.readFile(configPath, "utf-8");
    return JSON.parse(configData);
  } catch (e) {
    return { username: "Admin", password: "Shomzy123" };
  }
}

export default async function SettingsPage() {
  const config = await getAdminConfig();

  async function updateCredentials(formData: FormData) {
    "use server";
    
    const newUsername = formData.get("username") as string;
    const newPassword = formData.get("password") as string;

    if (newUsername && newPassword) {
      const configPath = path.join(process.cwd(), "src/config/admin.json");
      await fs.writeFile(configPath, JSON.stringify({ username: newUsername, password: newPassword }, null, 2));
      revalidatePath("/admin/settings");
    }
  }

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-8">Admin Settings</h1>
      
      <form action={updateCredentials} className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Change Login Credentials</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Username</label>
            <input 
              type="text" 
              name="username" 
              defaultValue={config.username} 
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Password</label>
            <input 
              type="text" 
              name="password" 
              defaultValue={config.password} 
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md" 
            />
            <p className="text-xs text-gray-500 mt-1">Make sure to remember your new password!</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button type="submit" className="bg-brand-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md">
            Save Credentials
          </button>
        </div>
      </form>
    </div>
  );
}
