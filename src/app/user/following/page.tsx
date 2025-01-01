import Following from "@/src/components/DFollowers/Following";

const page = () => {
  return (
    <div className="mr-5 my-5">
      <h1 className="text-3xl font-bold text-center py-4 bg-slate-100 rounded-md">
        Welcome to your Following Page.
      </h1>
      <div>
        <Following />
      </div>
    </div>
  );
};

export default page;
