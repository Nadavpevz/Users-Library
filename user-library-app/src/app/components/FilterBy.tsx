"use client";
import { Input, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { FilterParameterOptions } from "../types";
import { useDispatch } from "react-redux";
import { setFilter } from "@/lib/features/filters/filtersSlice";

const FilterBy: React.FC<{
  filterParameter: FilterParameterOptions;
}> = ({ filterParameter }) => {
  const dispatch = useDispatch();
  const [isSmallerThan700] = useMediaQuery("(max-width: 700px)");
  return (
    <Input
      placeholder={
        isSmallerThan700 ? filterParameter : `Filter by ${filterParameter}`
      }
      fontSize={isSmallerThan700 ? "small" : "medium"}
      border={"1px solid black"}
      onChange={(e) =>
        dispatch(setFilter({ filterParameter, input: e.target.value }))
      }
    />
  );
};

export default FilterBy;
