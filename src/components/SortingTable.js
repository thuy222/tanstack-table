import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tfoot,
  Flex,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import "../App.css";

export const SortingTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useTable(
    {
      columns: columns,
      data: data,
    },
    useSortBy
  );

  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            return (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}

                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          {footerGroups.map((footerGroup) => {
            return (
              <Tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => {
                  return (
                    <Td {...column.getFooterProps()}>
                      {column.render("Footer")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

const DisplayIcon = ({ desc }) => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      {desc ? (
        <>
          <TriangleUpIcon />
          <TriangleDownIcon color="red" />
        </>
      ) : (
        <>
          <TriangleUpIcon color="red" />
          <TriangleDownIcon />
        </>
      )}
    </Flex>
  );
};
