import DFollowers from "@/src/components/DFollowers/Followers";

const page = () => {
  return (
    <div>
      <h1 className="text-xl md:text-3xl lg:text-3xl mb-5 font-bold text-center py-4 bg-slate-100 rounded-md">
        Welcome to your followers Page.
      </h1>
      <div className="my-5">
        <DFollowers />
      </div>
    </div>
  );
};

export default page;
