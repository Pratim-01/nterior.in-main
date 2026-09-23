export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-[108px]">
      {children}
    </div>
  );
}