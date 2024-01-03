import { IUser } from "./types";

export const getUsers = async (): Promise<IUser[]> => {
  const res = await fetch("https://randomuser.me/api/?results=10");
  const data = await res.json();

  return data.results.map((user: any) => {
    return {
      name: {
        title: user.name.title,
        firstName: user.name.first,
        lastName: user.name.last,
      },
      email: user.email,
      image: user.picture.medium,
      location: {
        country: user.location.country,
        city: user.location.city,
        street: { ...user.location.street },
      },
      //note: some of the user id's are null , so i used login.uuid instead
      id: user.login.uuid,
    };
  });
};
