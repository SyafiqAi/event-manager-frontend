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
import { Select, MenuItem, IconButton } from "@mui/material";
import { EventStatus } from "../interfaces/eventStatus.enum";
import DeleteIcon from "@mui/icons-material/Delete";

const statusOptions: EventStatus[] = [
  EventStatus.COMPLETED,
  EventStatus.ONGOING,
];

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

const columns: (
  onRowDelete: (eventId: number) => void,
) => GridColDef<Event>[] = (onRowDelete) => {
  return [
    {
      field: "posterUrl",
      headerName: "Thumbnail",
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img
          src={`http://localhost:9000${params.value}`}
          alt="Thumbnail"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      ),
    },
    { field: "name", headerName: "Name", flex: 1, filterable: false },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      filterable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: false,
      filterOperators: [statusEqualsOperator],
    },
    {
      field: "startDate",
      headerName: "From",
      flex: 1,
      valueGetter: (value, row) =>
        `${new Date(row.startDate).toLocaleDateString()}`,
      filterable: false,
    },
    {
      field: "endDate",
      headerName: "To",
      flex: 1,
      valueGetter: (value, row) =>
        `${new Date(row.endDate).toLocaleDateString()}`,
      filterable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering onRowClick
            onRowDelete(params.row.id);
          }}
          size="small"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
};

type EventListTableProps = {
  data?: Event[];
  rowCount: number;
  isLoading: boolean;
  onPageChange: (model: GridPaginationModel) => void;
  paginationModel: GridPaginationModel;
  onSortModelChange: (model: GridSortModel) => void;
  onFilterModelChange: (model: GridFilterModel) => void;
  onRowClick: (eventId: number) => void;
  onRowDelete: (eventId: number) => void;
};

export default function EventListTable({
  data,
  rowCount,
  isLoading,
  onRowClick,
  onPageChange,
  paginationModel,
  onSortModelChange,
  onFilterModelChange,
  onRowDelete,
}: EventListTableProps) {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data ?? []}
        columns={columns(onRowDelete)}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={onPageChange}
        pageSizeOptions={[5, 10]}
        sx={{
          border: 0,
          "& .MuiDataGrid-row:hover": {
            cursor: "pointer",
          },
        }}
        sortingMode="server"
        onSortModelChange={onSortModelChange}
        filterMode="server"
        onFilterModelChange={onFilterModelChange}
        onRowClick={(e) => {
          onRowClick(Number(e.id));
        }}
      />
    </Paper>
  );
}
