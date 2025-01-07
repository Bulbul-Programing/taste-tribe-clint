import Following from "@/src/components/DFollowers/Following";

const page = () => {
  return (
    <div>
      <h1 className="text-xl md:text-3xl lg:text-3xl mb-5 font-bold text-center py-4 bg-slate-100 rounded-md">
        Welcome to your Following Page.
      </h1>
      <div>
        <Following />
      </div>
    </div>
  );
};

export default page;
