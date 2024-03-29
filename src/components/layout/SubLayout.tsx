import CategorySub from "@/components/modules/category/CategorySub";

export default function SubLayout({ children }:any) {
    return (
      <>
        <div className="inner" style={{ minHeight: '100vh' }}>
            <CategorySub />
            <main>{children}</main>
        </div>
      </>
    )
  }