export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-300 blur-3xl opacity-30">
      </div>


      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-300 blur-3xl opacity-30">
      </div>

    </div>
  );
}