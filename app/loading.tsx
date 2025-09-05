export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Loading BaseBounties
        </h2>
        <p className="text-text-secondary">
          Preparing your decentralized bounty hub...
        </p>
      </div>
    </div>
  );
}
