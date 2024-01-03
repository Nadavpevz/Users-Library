export type IUser = {
  name: {
    title: string;
    firstName: string;
    lastName: string;
  };
  email: string;
  image: string;
  location: {
    country: string;
    city: string;
    street: {
      number: number;
      name: string;
    };
  };
  id: string;
};

export type FilterParameterOptions = "email" | "name" | "location" | "id";
