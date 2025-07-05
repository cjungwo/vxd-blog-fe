"use client";

import { useRouter } from "next/navigation";
import { clearAuth, useAuthStore } from "@/shared";

export default function ProfilePage() {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();

  if (!user) {
    router.push('/sign-in');
    return <div>Redirecting to sign in...</div>;
  }

  const showModal = (id: string) => {
    (document.getElementById(id) as HTMLDialogElement)?.showModal();
  };

  const closeModal = (id: string) => {
    (document.getElementById(id) as HTMLDialogElement)?.close();
  };

  const handleDeleteAccount = async () => {
    try {
      await fetch('/api/v1/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      clearAuth();
      router.push('/');
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  return <div className="flex flex-col items-center p-4">
    <div className="flex flex-col items-start w-full h-full bg-gray-100 p-4 rounded-md">
      <h2 className="text-3xl font-bold text-black">Profile</h2>
      <div className="bg-white rounded-md p-4 mt-4 w-full">
        <div className="flex flex-col items-start">
          <p className="text-lg font-semibold text-black">Username</p>
          <p className="text-lg text-black">{user.name}</p>
        </div>
        <div className="flex flex-col items-start mt-4">
          <p className="text-lg font-semibold text-black">Email</p>
          <p className="text-lg text-black">{user.email}</p>
        </div>
        <div className="flex flex-col items-start mt-4">
          <p className="text-lg font-semibold text-black">About Me</p>
          <p className="text-lg mt-2 text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-6 w-full">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => showModal('update-profile-modal')}
          >
            Update Profile
          </button>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={() => showModal('logout-modal')}
          >
            Logout
          </button>
          <button 
            className="mt-4 text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors"
            onClick={() => showModal('delete-account-modal')}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>

    {/* Update Profile Modal */}
    <dialog id="update-profile-modal" className="modal bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h3 className="text-xl font-bold mb-4">Update Profile</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            defaultValue={user.name || ''} 
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
          <textarea 
            defaultValue="Tell us about yourself..."
            className="w-full border rounded px-3 py-2 h-24"
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            type="button" 
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            onClick={() => closeModal('update-profile-modal')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </dialog>

    {/* Logout Confirmation Modal */}
    <dialog id="logout-modal" className="modal bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
      <p className="mb-6">Are you sure you want to logout?</p>
      <div className="flex justify-end space-x-3">
        <button 
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          onClick={() => closeModal('logout-modal')}
        >
          Cancel
        </button>
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => { 
            clearAuth(); 
            closeModal('logout-modal');
            router.push('/');
          }}
        >
          Logout
        </button>
      </div>
    </dialog>

    {/* Delete Account Confirmation Modal */}
    <dialog id="delete-account-modal" className="modal bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h3 className="text-xl font-bold mb-2 text-red-600">Delete Account</h3>
      <p className="mb-6 text-gray-700">
        Warning: This action cannot be undone. All your data will be permanently deleted.
      </p>
      <div className="space-y-2 mb-6">
        <p className="font-medium">This will:</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Delete your profile information</li>
          <li>Remove all your posts and comments</li>
          <li>Permanently delete your account</li>
        </ul>
      </div>
      <div className="flex justify-end space-x-3">
        <button 
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          onClick={() => closeModal('delete-account-modal')}
        >
          Cancel
        </button>
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleDeleteAccount}
        >
          Delete My Account
        </button>
      </div>
    </dialog>
  </div>;
}