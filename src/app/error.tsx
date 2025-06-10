'use client';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
        <p className="text-gray-600">The post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      </div>
    </div>
  );
};
