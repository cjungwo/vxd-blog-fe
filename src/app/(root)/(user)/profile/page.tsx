"use client";

import { useUserAuth } from "@/shared";

export default function ProfilePage() {
  const { clearAuth } = useUserAuth();

  const showLogoutModal = () => {
    document.querySelector('dialog')?.showModal();
  }

  const closeLogoutModal = () => {
    document.querySelector('dialog')?.close();
  }

  return <div>
    <h2 className="text-2xl font-bold">Profile</h2>
    <p>Profile Page</p>
    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={showLogoutModal}>Logout</button>
    <dialog className="modal">
      <p>Are you sure you want to logout?</p>
      <button onClick={() => {clearAuth(); closeLogoutModal()}}>Logout</button>
      <button onClick={closeLogoutModal}>Cancel</button>
    </dialog>
  </div>;
}