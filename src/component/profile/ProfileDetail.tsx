import { useState } from "react";
import { ProfileEdit } from "./EditForm";
import { Profile } from "@/type/auth";
interface Props {
  data: Profile;
}
export const ProfileDetail = ({ data }: Props) => {
  const [isEdit, setEdit] = useState(false);
  return (
    <div>
      {isEdit ? (
        <ProfileEdit data={data} />
      ) : (
        <div>
          <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
            Profile Details
          </h3>
          <table className="max-w-screen-lg text-left ">
            <tbody>
              <tr>
                <th className="px-2 py-3 " scope="col">
                  Name
                </th>
                <td className="px-2 py-3 " scope="col">
                  -
                </td>
                <td className="px-2 py-3 " scope="col">
                  {data?.name}
                </td>
              </tr>
              <tr>
                <th className="px-2 py-3 " scope="col">
                  Email
                </th>
                <td className="px-2 py-3 " scope="col">
                  -
                </td>
                <td className="px-2 py-3 " scope="col">
                  {data?.email}
                </td>
              </tr>
              <tr>
                <th className="px-2 py-3 " scope="col">
                  Phone
                </th>
                <td className="px-2 py-3 " scope="col">
                  -
                </td>
                <td className="px-2 py-3 " scope="col">
                  {data?.phone || "---"}
                </td>
              </tr>
            </tbody>
          </table>
          <button className="login-btn px-10" onClick={() => setEdit(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
