import React from "react";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";

import TTInput from "../Form/TTInput";
import TTForm from "../Form/TTForm";

const Bulbul = ({ data }: { data: any }) => {
  const handleUpdate: SubmitHandler<FieldValues> = (data) => {};

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-5 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Update Your Profile</h2>
        <TTForm onSubmit={handleUpdate}>
          <div className="grid grid-cols-2 gap-x-3">
            <TTInput defaultValue={data?.data?.name} label="name" name="name" />
            <TTInput
              disabled
              defaultValue={data?.data?.email}
              label="email"
              name="email"
            />
            {/* <TTInput label="name" name="name" defaultValue="bulbul" onChange={() => handleOnchange()} />
                        <TTInput label="name" name="name" defaultValue="bulbul" onChange={() => handleOnchange()} />
                        <TTInput label="name" name="name" defaultValue="bulbul" onChange={() => handleOnchange()} /> */}
          </div>
          <Button type="submit">Submit</Button>
        </TTForm>
      </div>
    </div>
  );
};

export default Bulbul;
