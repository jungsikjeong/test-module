export const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[16px] font-bold">{title}</h2>
    </div>
  );
};

SectionTitle.displayName = "SectionTitle";
