export const Aside: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <aside className={`bg-slate-100 h-screen w-60 xl:w-2/12 dark:bg-slate-800 z-20 ${className}`}>
      <h1>Aside</h1>
    </aside>
  );
};
