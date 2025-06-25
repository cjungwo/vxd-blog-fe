'use client';

export default function ProfileErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Auth Error</h1>
        <p className="text-gray-600">You are not logged in.</p>
      </div>
    </div>
  );
};
