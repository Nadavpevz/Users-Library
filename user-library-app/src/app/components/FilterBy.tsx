import { Input } from "@chakra-ui/react";
import React from "react";
import { FilterParameterOptions } from "../types";
import { useDispatch } from "react-redux";
import { setFilter } from "@/lib/features/filters/filtersSlice";

const FilterBy: React.FC<{
  filterParameter: FilterParameterOptions;
}> = ({ filterParameter }) => {
  const dispatch = useDispatch();
  return (
    <Input
      placeholder={`Filter by ${filterParameter}`}
      border={"1px solid black"}
      onChange={(e) =>
        dispatch(setFilter({ filterParameter, input: e.target.value }))
      }
    />
  );
};

export default FilterBy;
