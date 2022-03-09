import React from "react";
import { Stack } from "react-bootstrap";
import Tree from "react-d3-tree";

const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

const NetworkGraph = () => {
  return (
    <Stack>
      <Tree data={orgChart} />
    </Stack>
  );
};

export default NetworkGraph;
