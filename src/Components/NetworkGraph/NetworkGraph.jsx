import React, { useEffect, useState } from "react";
import { Stack, Table } from "react-bootstrap";
import Tree from "react-d3-tree";
import axios from "axios";
import { BACKEND_URL } from "../../Config";

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/data`)
      .then((req, res) => {
        setData(req.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Stack>
      <h1>Network Devices</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Device Name</th>
            <th>Key</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            console.log(item);
            return (
              <tr key={item.device_id}>
                <td>{`${item.device_id}`}</td>
                <td>{item.device_name}</td>
                <td>{item.private_key}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Stack>
  );
};

export default NetworkGraph;
