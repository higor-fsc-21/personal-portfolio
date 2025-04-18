import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ScrollToTop />
    </>
  );
}
