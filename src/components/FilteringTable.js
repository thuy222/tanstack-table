import { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tfoot,
} from "@chakra-ui/react";

import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import "../App.css";
import GlobalFilter from "./GlobalFilter";

export const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: data,
    },
    useFilters,
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <TableContainer>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            return (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <Th {...column.getHeaderProps()}>
                      {column.render("Header")}
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
