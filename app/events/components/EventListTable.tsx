"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridFilterOperator,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Event } from "../interfaces/event.interface";
import { Select, MenuItem } from "@mui/material";
import { EventStatus } from "../interfaces/eventStatus.enum";

const statusOptions: EventStatus[] = [EventStatus.COMPLETED, EventStatus.ONGOING];

const statusEqualsOperator: GridFilterOperator = {
  label: "is",
  value: "equals",
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (!filterItem.value) return null;
    return (params) => params.value === filterItem.value;
  },
  InputComponent: (props) => (
    <Select
      value={props.item.value ?? ""}
      onChange={(e) =>
        props.applyValue({ ...props.item, value: e.target.value })
      }
      fullWidth
      size="small"
    >
      {statusOptions.map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
  ),
};

const columns: GridColDef<Event>[] = [
  { field: "name", headerName: "Name", width: 130, filterable: false },
  { field: "location", headerName: "Location", width: 130, filterable: false },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    sortable: false,
    filterOperators: [statusEqualsOperator],
  },
  {
    field: "startDate",
    headerName: "From",
    width: 130,
    valueGetter: (value, row) =>
      `${new Date(row.startDate).toLocaleDateString()}`,
    filterable: false,
  },
  {
    field: "endDate",
    headerName: "To",
    width: 130,
    valueGetter: (value, row) =>
      `${new Date(row.endDate).toLocaleDateString()}`,
    filterable: false,
  },
];

type EventListTableProps = {
  data?: Event[];
  rowCount: number;
  isLoading: boolean;
  onPageChange: (model: GridPaginationModel) => void;
  paginationModel: GridPaginationModel;
  onSortModelChange: (model: GridSortModel) => void;
  onFilterModelChange: (model: GridFilterModel) => void;
};

export default function EventListTable({
  data,
  rowCount,
  isLoading,
  onPageChange,
  paginationModel,
  onSortModelChange,
  onFilterModelChange
}: EventListTableProps) {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data ?? []}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={onPageChange}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        sortingMode="server"
        onSortModelChange={onSortModelChange}
        filterMode="server"
        onFilterModelChange={onFilterModelChange}
      />
    </Paper>
  );
}
